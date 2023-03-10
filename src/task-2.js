import { generateRandomUserDataString as newEntry } from "./generateRandomUserDataString.js";
import c from "chalk";
import { appendFile, mkdir } from "node:fs/promises";
import readline from "node:readline/promises";
const fileName = "people.txt";
const dirPath = new URL("./../database/task-1", import.meta.url).pathname;

console.log(c.yellow.bold("LOGIN: "));
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
let login = await rl.question(c.bgBlue.bold("username:") + " ");
let password = await rl.question(c.bgBlue.bold("password:") + " ");

if (login.trim() !== "admin" || password.trim() !== "1234") {
  console.log(c.red("Neteisingi prisijungimo duomenys"));
  rl.close();
} else {
  await mkdir(dirPath, { recursive: true });
  try {
    await appendFile(`${dirPath}/${fileName}`, newEntry()); ///kelias ne nuo sito failo, bet nuo project rooto??...
    console.log(c.green("Duomenys faile sėkmingai išsaugoti"));
  } catch (err) {
    console.error(err);
  } finally {
    rl.close();
  }
}
