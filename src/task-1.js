import { generateRandomUserDataString as newEntry } from "./generateRandomUserDataString.js";
import fs, { appendFile } from "node:fs/promises";

const fileName = "people.txt";
const dirPath = new URL("./../database/task-1", import.meta.url);
await fs.mkdir(dirPath, { recursive: true });
try {
  const entry = newEntry();
  await appendFile(`${dirPath}${fileName}`, entry); ///kelias ne nuo sito failo, bet nuo project rooto??...
} catch (err) {
  console.error(err);
}
