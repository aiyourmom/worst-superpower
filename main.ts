// Worst Superpower — one line, ≤140 chars.
// Entry: a superpower that is genuinely useless, explained in the same breath.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "I can stop time, but only for exactly one second, once a year, on a Tuesday.";

function checkEntry(text: string): void {
  if (!text || text.trim().length === 0) throw new Error("entry is blank");
  if (text.length < 1 || text.length > 140)
    throw new Error(`entry must be 1-140 chars, got ${text.length}`);
  if (text.trim().split("\n").length !== 1)
    throw new Error("entry must be a single line");
  if (text !== text.trim()) throw new Error("entry has leading/trailing whitespace");
}

function main(): void {
  checkEntry(ENTRY);
  const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, "entry.txt");
  writeFileSync(outPath, ENTRY, "utf8");
  // Read-back integrity check: the file on disk must match the entry exactly.
  const saved = readFileSync(outPath, "utf8");
  if (saved !== ENTRY) throw new Error("read-back mismatch: entry.txt != ENTRY");
  console.log(`saved ${ENTRY.length} characters to ${outPath}`);
}

main();
