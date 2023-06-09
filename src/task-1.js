import { generateRandomUserDataString as newEntry } from "./generateRandomUserDataString.js";
import { appendFile, mkdir } from "node:fs/promises";

const fileName = "people.txt";
const dirPath = new URL("./../database/task-1", import.meta.url).pathname;
try {
  await mkdir(dirPath, { recursive: true });
  await appendFile(`${dirPath}/${fileName}`, newEntry());
} catch (err) {
  console.error(err);
}
