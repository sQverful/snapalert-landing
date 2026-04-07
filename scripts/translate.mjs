#!/usr/bin/env node

/**
 * Translates en.json into target languages using Google Gemini API.
 *
 * Usage:
 *   GEMINI_API_KEY=... node scripts/translate.mjs
 *   GEMINI_API_KEY=... node scripts/translate.mjs es fr   # only specific languages
 *
 * Requires: Node 18+ (uses native fetch)
 */

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const MESSAGES_DIR = join(__dirname, '..', 'messages');

const TARGET_LANGUAGES = {
  zh: 'Chinese (Simplified)',
  es: 'Spanish',
  ar: 'Arabic',
  pt: 'Portuguese (Brazilian)',
  fr: 'French',
  ja: 'Japanese',
  de: 'German',
  hi: 'Hindi',
  ko: 'Korean',
};

const API_KEY = process.env.GEMINI_API_KEY;
if (!API_KEY) {
  console.error('Error: GEMINI_API_KEY environment variable is required');
  process.exit(1);
}

const MODEL = process.env.GEMINI_MODEL || 'gemini-2.5-flash';
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`;

async function translateJSON(sourceJSON, targetLang, targetName) {
  const prompt = `You are a professional translator. Translate the following JSON from English to ${targetName}.

Rules:
- Translate ONLY the string values, never the keys
- Keep all JSON structure, keys, brackets, and formatting exactly as-is
- Do NOT translate brand names: "SnapAlert", "Telegram", "EDGAR", "SEC"
- Do NOT translate pricing values ($0, $4.99, etc.), numbers, or technical values (99.9%, 24/7, < 5 min)
- Do NOT translate URL paths or technical identifiers
- Keep the translation natural and fluent, not word-for-word
- Respond with ONLY the translated JSON, no markdown fences, no explanation

JSON to translate:
${sourceJSON}`;

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.2,
        maxOutputTokens: 8192,
      },
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Gemini API error (${response.status}): ${error}`);
  }

  const data = await response.json();
  let text = data.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!text) {
    throw new Error('Empty response from Gemini API');
  }

  // Strip markdown code fences if present
  text = text.replace(/^```(?:json)?\n?/gm, '').replace(/\n?```$/gm, '').trim();

  // Validate JSON
  JSON.parse(text);
  return text;
}

async function main() {
  const sourceFile = join(MESSAGES_DIR, 'en.json');
  const sourceJSON = readFileSync(sourceFile, 'utf-8');

  // Filter to specific languages if args provided
  const args = process.argv.slice(2);
  const targets = args.length > 0
    ? Object.fromEntries(Object.entries(TARGET_LANGUAGES).filter(([code]) => args.includes(code)))
    : TARGET_LANGUAGES;

  if (Object.keys(targets).length === 0) {
    console.error(`No valid languages found. Available: ${Object.keys(TARGET_LANGUAGES).join(', ')}`);
    process.exit(1);
  }

  console.log(`Translating en.json → ${Object.keys(targets).join(', ')}\n`);

  for (const [code, name] of Object.entries(targets)) {
    const outFile = join(MESSAGES_DIR, `${code}.json`);
    const exists = existsSync(outFile);

    process.stdout.write(`  ${code} (${name})... `);

    try {
      const translated = await translateJSON(sourceJSON, code, name);
      writeFileSync(outFile, translated + '\n', 'utf-8');
      console.log(exists ? 'updated' : 'created');
    } catch (err) {
      console.log(`FAILED: ${err.message}`);
    }

    // Rate limit: ~1 request per second
    await new Promise((r) => setTimeout(r, 1200));
  }

  console.log('\nDone. Review translations before committing.');
  console.log('Update i18n/routing.ts to add new locales.');
}

main();
