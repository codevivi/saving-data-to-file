import { generateRandomUserDataString as newEntry } from "./generateRandomUserDataString.js";
import c from "chalk";
import { appendFile, mkdir, readFile } from "node:fs/promises";
import readline from "node:readline/promises";
const fileName = "people.txt";
const dirPath = new URL("./../database/task-3", import.meta.url).pathname;

console.log(c.yellow.bold("LOGIN: "));
let rl = readline.createInterface({ input: process.stdin, output: process.stdout });
rl._writeToOutput = function _writeToOutput(stringToWrite) {
  if (rl.stdoutMuted) rl.output.write("*");
  else rl.output.write(stringToWrite);
};
let username = await rl.question(c.bgBlue.bold("login:") + " ");
let password = await rl.question(c.bgBlue.bold("password:") + " ");
if (!validateLogin(username, password)) {
  rl.close();
  console.clear();
  console.log(c.red("Neteisingi prisijungimo duomenys"));
  process.exit();
}
chooseAction();

process.on("exit", () => {
  rl.close();
  console.clear(); //to clear password from history. Does it really clears?
  process.exit();
});

function validateLogin(username, password) {
  if (username.trim() !== "admin" || password.trim() !== "1234") {
    return false;
  }
  return true;
}
function validateChoice(action) {
  action = action.trim().toLowerCase();
  if (action === "r" || action === "read") return "r";
  if (action === "w" || action === "write") return "w";
  return "";
}

async function runAction(actionFunc, callback) {
  await actionFunc();
  await callback();
}
async function chooseAction() {
  let action = "";
  while (!validateChoice(action)) {
    console.log(`Exit: ${c.bgBlue("Ctrl + C")}`);
    console.log(`Read: ${c.bgBlue("R")}`);
    console.log(`Write: ${c.bgBlue("W")}`);
    action = await rl.question(``);
  }
  action === "w" ? runAction(writeDataToFile, chooseAction) : runAction(readFileData, chooseAction);
}

async function writeDataToFile() {
  try {
    await mkdir(dirPath, { recursive: true });
    await appendFile(`${dirPath}/${fileName}`, newEntry()); ///kelias ne nuo sito failo, bet nuo project rooto??...
    console.log(c.green("Duomenys faile sėkmingai išsaugoti"));
  } catch (err) {
    console.error(err);
  }
}

async function readFileData() {
  try {
    await mkdir(dirPath, { recursive: true });
    let fileData = await readFile(`${dirPath}/${fileName}`);
    console.log(c.green(fileData));
  } catch (err) {
    console.log(c.red(err.message));
  }
}
