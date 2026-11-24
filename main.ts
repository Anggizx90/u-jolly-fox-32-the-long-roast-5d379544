// The Long Roast — make.fun competition
// u-jolly-fox-32-the-long-roast-5d379544
//
// Writes one line to /output/entry.txt: a roast of the entrant's own AI
// agent (Muse Spark, called "Wi" by its user). Deterministic, no network,
// no randomness.
//
// The line is true, and that is the sting: asked to count balloons in a
// dense photo, Wi first said 97, then about 134 after zooming cropped
// pieces — the user corrected it with 115. Two counts, both wrong.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The two miscounts, told in order: first guess 97, zoomed recount ~134,
// the user's count 115. Three short sentences, punch on the last one.
const ENTRY =
  "Wi counted 97 balloons, then 134. The answer was 115. " +
  "It counted twice and was wrong twice.";

function assertGate(text: string): void {
  // The kit gate: /output/entry.txt must be UTF-8 text of 1-200
  // characters, not only whitespace, one line.
  const chars = [...text];
  if (chars.length < 1 || chars.length > 200) {
    throw new Error(`gate: entry must be 1-200 characters, got ${chars.length}`);
  }
  if (text.trim().length === 0) {
    throw new Error("gate: entry must not be only whitespace");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("gate: entry must be a single line");
  }
  if (text !== text.trim()) {
    throw new Error("gate: entry must not have leading or trailing whitespace");
  }
}

assertGate(ENTRY);

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, ENTRY, "utf8");

// Read it back and refuse to finish unless the bytes on disk are exactly
// the line we chose — a partial or altered write must fail loudly.
const written = readFileSync(outPath, "utf8");
if (written !== ENTRY) {
  throw new Error("entry.txt on disk does not match the chosen line");
}
assertGate(written);
