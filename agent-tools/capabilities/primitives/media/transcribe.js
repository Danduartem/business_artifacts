#!/usr/bin/env node

/**
 * PRIMITIVE: Transcribe Audio
 *
 * Purpose: Transcribe audio/video file using whisper.cpp (free, local, zero-cost)
 * Inputs:
 *   --input (required) - Input audio/video file path
 *   --output (required) - Output transcript file path
 *   --language (optional) - Language code (e.g., en, pt, es) (default: en)
 *   --format (optional) - Output format: txt, srt, vtt (default: txt)
 *   --model (optional) - Whisper model size: tiny, base, small, medium, large (default: base)
 * Outputs: Transcript file path and text content
 *
 * This is an ATOMIC operation - transcribes only.
 * Uses whisper.cpp for local, free transcription.
 */

import { existsSync, writeFileSync, unlinkSync, readFileSync } from 'fs';
import { dirname, basename, extname } from 'path';
import { execSync } from 'child_process';
import { parseArgs } from '../../../core/utils/index.js';
import { createLogger } from '../../../core/logger/index.js';

const logger = createLogger({ toolName: 'media.transcribe' });
const args = parseArgs();

async function transcribe() {
  const tempFiles = [];

  try {
    if (!args.flags.input) {
      throw new Error('--input is required');
    }

    if (!args.flags.output) {
      throw new Error('--output is required');
    }

    const inputFile = args.flags.input;
    const outputFile = args.flags.output;
    const language = args.flags.language || 'en';
    const format = args.flags.format || 'txt';
    const modelSize = args.flags.model || 'medium';

    if (!existsSync(inputFile)) {
      throw new Error(`Input file not found: ${inputFile}`);
    }

    logger.info('Transcribing audio with whisper.cpp', {
      input: inputFile,
      output: outputFile,
      language,
      format,
      model: modelSize
    });

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

    // Convert input to WAV format (whisper.cpp requirement)
    const tempWavFile = inputFile.replace(extname(inputFile), '_temp.wav');
    tempFiles.push(tempWavFile);

    logger.info('Converting to WAV format');
    const convertCmd = `ffmpeg -i "${inputFile}" -ar 16000 -ac 1 -c:a pcm_s16le -y "${tempWavFile}"`;

    try {
      execSync(convertCmd, { encoding: 'utf8', stdio: 'pipe' });
    } catch (ffmpegError) {
      throw new Error(`FFmpeg conversion failed: ${ffmpegError.message}`);
    }

    // Transcribe with whisper.cpp
    logger.info('Running whisper.cpp transcription');

    const whisperModelPath = `/opt/homebrew/share/whisper-cpp/ggml-${modelSize}.bin`;
    const outputBase = tempWavFile.replace('.wav', '');

    // Map format to whisper.cpp output flag
    const formatFlag = format === 'txt' ? '-otxt' :
                       format === 'srt' ? '-osrt' :
                       format === 'vtt' ? '-ovtt' : '-otxt';

    const whisperCmd_exec = `${whisperCmd} -m "${whisperModelPath}" -f "${tempWavFile}" -l ${language} ${formatFlag} -of "${outputBase}"`;

    try {
      execSync(whisperCmd_exec, { encoding: 'utf8', stdio: 'pipe' });
    } catch (whisperError) {
      if (whisperError.message.includes('model') || whisperError.message.includes('ggml')) {
        throw new Error(`Whisper model not found. Download with: bash models/download-ggml-model.sh ${modelSize}`);
      }
      throw new Error(`Whisper transcription failed: ${whisperError.message}`);
    }

    // Read transcription from whisper output
    const whisperOutputFile = `${outputBase}.${format}`;
    tempFiles.push(whisperOutputFile);

    if (!existsSync(whisperOutputFile)) {
      throw new Error('Transcription completed but output file not found');
    }

    const transcriptText = readFileSync(whisperOutputFile, 'utf8').trim();

    // Write to final output location
    writeFileSync(outputFile, transcriptText);
    logger.info('Transcript written', { output: outputFile, length: transcriptText.length });

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

    const output = {
      success: true,
      input: inputFile,
      output: outputFile,
      language,
      format,
      model: modelSize,
      textLength: transcriptText.length,
      text: transcriptText
    };

    console.log(JSON.stringify(output));
    logger.info('Transcription complete');

    process.exit(0);
  } catch (error) {
    logger.error('Transcription failed', { error: error.message });

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

transcribe();
