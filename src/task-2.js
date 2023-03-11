import { generateRandomUserDataString as newEntry } from "./generateRandomUserDataString.js";
import c from "chalk";
import { appendFile, mkdir } from "node:fs/promises";
import readline from "node:readline/promises";

const fileName = "people.txt";
const dirPath = new URL("./../database/task-2", import.meta.url).pathname;
console.log(c.yellow.bold("LOGIN: "));
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
rl.on("SIGINT", closeProgram);

let login = await rl.question(c.bgBlue.bold("username:") + " ");
let password = await rl.question(c.bgBlue.bold("password:") + " ");

if (login.trim() !== "admin" || password.trim() !== "1234") {
  closeProgram(c.red("Neteisingi prisijungimo duomenys"));
} else {
  try {
    await mkdir(dirPath, { recursive: true });
    await appendFile(`${dirPath}/${fileName}`, newEntry()); ///kelias ne nuo sito failo, bet nuo project rooto??...
    closeProgram(c.green("Duomenys faile sėkmingai išsaugoti"));
  } catch (err) {
    closeProgram(c.red(err.message));
  }
}

function closeProgram(msg = "") {
  console.clear(); //to clear password from history. Does it really clears?
  console.log(msg);
  rl.close();
  process.exit(0);
}
