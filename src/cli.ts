import { readFile } from "node:fs/promises";
import { summarise } from "./summarise.js";
import type { Event } from "./types.js";

async function readInput(): Promise<string> {
  const filePath = process.argv[2];

  if (!filePath) {
    throw new Error("Expected a file path argument");
  }

  return readFile(filePath, "utf8");
}

async function main(): Promise<void> {
  const raw = await readInput();
  const parsed: unknown = JSON.parse(raw);

  if (!Array.isArray(parsed)) {
    throw new Error("Expected a JSON array of events");
  }

  const summary = summarise(parsed as Event[]);

  console.log(JSON.stringify(summary, null, 2));
}

main().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(message);
  process.exit(1);
});
