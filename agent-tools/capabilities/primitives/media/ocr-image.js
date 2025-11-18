#!/usr/bin/env node

/**
 * @tool media.ocr-image
 * @description Extract text from images using Tesseract OCR (free, local, zero-cost)
 * @category media
 *
 * @input input string - Path to image file (required)
 * @input output string - Path to save extracted text (optional)
 * @input language string - OCR language code (optional, default: eng)
 * @output text string - Extracted text from image
 * @output success boolean - Operation success status
 *
 * @systemDependency tesseract
 *
 * @example
 * node media/ocr-image.js --input /path/to/image.jpg
 *
 * @example-output
 * {"success": true, "text": "Extracted text content from image...", "output": "/path/to/output.txt"}
 */

import { existsSync, writeFileSync } from 'fs';
import { dirname, basename, extname, join } from 'path';
import { execSync } from 'child_process';
import { parseArgs } from '../../../core/utils/index.js';
import { createLogger } from '../../../core/logger/index.js';

const logger = createLogger({ toolName: 'media.ocr-image' });
const args = parseArgs();

async function ocrImage() {
  try {
    if (!args.flags.input) {
      throw new Error('--input is required');
    }

    const inputFile = args.flags.input;

    if (!existsSync(inputFile)) {
      throw new Error(`Input file not found: ${inputFile}`);
    }

    // Check if tesseract is installed
    try {
      execSync('which tesseract', { encoding: 'utf8', stdio: 'pipe' });
    } catch (checkError) {
      throw new Error('Tesseract is not installed. Install with: brew install tesseract (macOS) or sudo apt-get install tesseract-ocr (Linux)');
    }

    const language = args.flags.language || 'eng';
    const outputFile = args.flags.output ||
      join(
        dirname(inputFile),
        `${basename(inputFile, extname(inputFile))}_text.txt`
      );

    logger.info('Extracting text from image using Tesseract', { input: inputFile, language });

    // Create temp output path (tesseract adds .txt automatically)
    const tempOutput = join(
      dirname(outputFile),
      basename(outputFile, '.txt')
    );

    // Run Tesseract OCR
    // tesseract image.jpg output -l eng
    const cmd = `tesseract "${inputFile}" "${tempOutput}" -l ${language}`;

    try {
      execSync(cmd, { encoding: 'utf8', stdio: 'pipe' });
    } catch (tesseractError) {
      // Check if it's a language pack issue
      if (tesseractError.message.includes('failed to load language')) {
        throw new Error(`Tesseract language pack '${language}' not found. Install with: brew install tesseract-lang (macOS)`);
      }
      throw new Error(`Tesseract OCR failed: ${tesseractError.message}`);
    }

    // Read the output file (tesseract creates filename.txt)
    const actualOutputFile = `${tempOutput}.txt`;

    if (!existsSync(actualOutputFile)) {
      throw new Error('Tesseract did not generate output file');
    }

    // Read extracted text
    const { readFileSync } = await import('fs');
    const extractedText = readFileSync(actualOutputFile, 'utf8').trim();

    // If user specified a different output path, move it
    if (actualOutputFile !== outputFile) {
      const { renameSync } = await import('fs');
      try {
        renameSync(actualOutputFile, outputFile);
      } catch (moveError) {
        // If rename fails, just keep the tesseract-generated file
        logger.warn('Could not rename output file', { from: actualOutputFile, to: outputFile });
      }
    }

    const finalOutputFile = existsSync(outputFile) ? outputFile : actualOutputFile;

    const result = {
      success: true,
      input: inputFile,
      output: finalOutputFile,
      text: extractedText,
      characterCount: extractedText.length,
      language,
      tool: 'tesseract-ocr'
    };

    console.log(JSON.stringify(result));
    logger.info('OCR complete', { output: finalOutputFile, chars: extractedText.length });


    process.exit(0);
  } catch (error) {
    logger.error('OCR failed', { error: error.message });

    console.log(JSON.stringify({
      success: false,
      error: error.message,
      input: args.flags.input,
      note: error.message.includes('not installed') ? 'Install Tesseract: brew install tesseract' : undefined
    }));

    process.exit(1);
  }
}

ocrImage();
