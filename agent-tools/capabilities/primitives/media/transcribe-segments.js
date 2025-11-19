#!/usr/bin/env node

/**
 * @tool media.transcribe-segments
 * @description Transcribe video with timestamps in specific time segments using whisper.cpp (free, local, zero-cost)
 * @category media
 *
 * @input input string - Input video file path (required)
 * @input segments string - Comma-separated time segments in format "0-3,3-10,10+" (optional, default: "0-3,3-10,10+")
 * @input output string - Output file path (optional)
 * @input language string - Language code (e.g., en, pt, es) (optional)
 * @input model string - Whisper model size: tiny, base, small, medium, large (optional, default: base)
 *
 * @output segments array - Array of transcription segments with timestamps
 * @output success boolean - Operation success status
 *
 * @systemDependency ffmpeg
 * @systemDependency whisper.cpp
 *
 * @example
 * node media/transcribe-segments.js --input /path/to/video.mp4 --segments "0-3,3-10,10+"
 *
 * @example-output
 * {"success": true, "segments": [{"range": "0-3s", "text": "..."}, {"range": "3-10s", "text": "..."}, {"range": "10+s", "text": "..."}]}
 */

import { existsSync, writeFileSync, unlinkSync } from 'fs';
import { dirname, basename, extname, join } from 'path';
import { execSync } from 'child_process';
import { parseArgs } from '../../../core/utils/index.js';
import { createLogger } from '../../../core/logger/index.js';

const logger = createLogger({ toolName: 'media.transcribe-segments' });
const args = parseArgs();

async function transcribeSegments() {
  const tempFiles = [];

  try {
    if (!args.flags.input) {
      throw new Error('--input is required');
    }

    const inputFile = args.flags.input;

    if (!existsSync(inputFile)) {
      throw new Error(`Input file not found: ${inputFile}`);
    }

    // Check if required tools are installed
    try {
      execSync('which ffmpeg', { encoding: 'utf8', stdio: 'pipe' });
    } catch (checkError) {
      throw new Error('FFmpeg is not installed. Install with: brew install ffmpeg');
    }

    // Check for whisper.cpp (main or whisper-cli)
    let whisperCmd = null;
    try {
      execSync('which whisper-cli', { encoding: 'utf8', stdio: 'pipe' });
      whisperCmd = 'whisper-cli';
    } catch {
      try {
        execSync('which main', { encoding: 'utf8', stdio: 'pipe' });
        whisperCmd = 'main';
      } catch {
        throw new Error('whisper.cpp is not installed. Install with: brew install whisper-cpp');
      }
    }

    // Parse segments (default: 0-3,3-10,10+)
    const segmentsStr = args.flags.segments || '0-3,3-10,10+';
    const segmentRanges = segmentsStr.split(',').map(s => s.trim());

    const language = args.flags.language || 'en';
    const modelSize = args.flags.model || 'medium';

    const outputFile = args.flags.output ||
      join(
        dirname(inputFile),
        `${basename(inputFile, extname(inputFile))}_segments.json`
      );

    logger.info('Transcribing video segments with whisper.cpp', {
      input: inputFile,
      segments: segmentRanges,
      model: modelSize
    });

    // Get video duration
    const durationCmd = `ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "${inputFile}"`;
    const durationStr = execSync(durationCmd, { encoding: 'utf8' }).trim();
    const totalDuration = parseFloat(durationStr);

    logger.info('Video duration detected', { duration: totalDuration });

    const results = [];

    for (const segment of segmentRanges) {
      // Parse segment range
      let startTime, endTime, label;

      if (segment.includes('+')) {
        // Handle "10+" format
        const start = parseFloat(segment.replace('+', ''));
        startTime = start;
        endTime = totalDuration;
        label = `${start}+s`;
      } else {
        // Handle "0-3" format
        const [start, end] = segment.split('-').map(s => parseFloat(s.trim()));
        startTime = start;
        endTime = Math.min(end, totalDuration);
        label = `${start}-${end}s`;
      }

      logger.info('Processing segment', { segment: label, start: startTime, end: endTime });

      // Extract audio segment using ffmpeg (whisper.cpp needs WAV format)
      const tempAudioFile = join(
        dirname(inputFile),
        `temp_segment_${startTime}_${endTime}.wav`
      );
      tempFiles.push(tempAudioFile);

      const duration = endTime - startTime;
      // Convert to 16kHz mono WAV (whisper.cpp requirement)
      const extractCmd = `ffmpeg -i "${inputFile}" -ss ${startTime} -t ${duration} -ar 16000 -ac 1 -c:a pcm_s16le -y "${tempAudioFile}"`;

      try {
        execSync(extractCmd, { encoding: 'utf8', stdio: 'pipe' });
      } catch (ffmpegError) {
        logger.warn('FFmpeg extraction failed', { segment: label, error: ffmpegError.message });
        results.push({
          range: label,
          startTime,
          endTime,
          text: '',
          error: 'Failed to extract audio segment'
        });
        continue;
      }

      // Transcribe segment with whisper.cpp
      try {
        // whisper.cpp command format: main -m model.bin -f input.wav -l en
        const whisperOutputFile = tempAudioFile.replace('.wav', '.txt');
        tempFiles.push(whisperOutputFile);

        const whisperModelPath = `/opt/homebrew/share/whisper-cpp/ggml-${modelSize}.bin`;
        const whisperExecCmd = `${whisperCmd} -m "${whisperModelPath}" -f "${tempAudioFile}" -l ${language} -otxt -of "${tempAudioFile.replace('.wav', '')}"`;

        execSync(whisperExecCmd, { encoding: 'utf8', stdio: 'pipe' });

        // Read transcription from output file
        const { readFileSync } = await import('fs');
        let transcription = '';

        if (existsSync(whisperOutputFile)) {
          transcription = readFileSync(whisperOutputFile, 'utf8').trim();
        } else {
          // Sometimes whisper.cpp outputs to stdout
          logger.warn('Whisper output file not found, transcription might be empty');
        }

        results.push({
          range: label,
          startTime,
          endTime,
          duration: duration,
          text: transcription
        });

        logger.info('Segment transcribed', { segment: label, length: transcription.length });
      } catch (transcribeError) {
        logger.warn('Transcription failed for segment', { segment: label, error: transcribeError.message });

        // If model not found, provide helpful error
        if (transcribeError.message.includes('model') || transcribeError.message.includes('ggml')) {
          results.push({
            range: label,
            startTime,
            endTime,
            text: '',
            error: `Whisper model not found. Download with: bash models/download-ggml-model.sh ${modelSize}`
          });
        } else {
          results.push({
            range: label,
            startTime,
            endTime,
            text: '',
            error: 'Transcription failed'
          });
        }
      }
    }

    // Clean up temp files
    for (const tempFile of tempFiles) {
      try {
        if (existsSync(tempFile)) {
          unlinkSync(tempFile);
        }
      } catch (cleanupError) {
        logger.warn('Failed to cleanup temp file', { file: tempFile });
      }
    }

    // Write output
    const output = {
      success: true,
      input: inputFile,
      totalDuration,
      segments: results,
      segmentCount: results.length,
      tool: 'whisper.cpp',
      model: modelSize
    };

    writeFileSync(outputFile, JSON.stringify(output, null, 2));

    console.log(JSON.stringify(output));
    logger.info('Segmented transcription complete', { output: outputFile, segments: results.length });


    process.exit(0);
  } catch (error) {
    logger.error('Segmented transcription failed', { error: error.message });

    // Clean up temp files on error
    for (const tempFile of tempFiles) {
      try {
        if (existsSync(tempFile)) {
          unlinkSync(tempFile);
        }
      } catch {}
    }

    console.log(JSON.stringify({
      success: false,
      error: error.message,
      input: args.flags.input,
      note: error.message.includes('not installed') ? 'Install required tools: brew install ffmpeg whisper-cpp' : undefined
    }));

    process.exit(1);
  }
}

transcribeSegments();
