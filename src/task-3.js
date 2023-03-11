import { generateRandomUserDataString as newEntry } from "./generateRandomUserDataString.js";
import c from "chalk";
import { appendFile, mkdir, readFile } from "node:fs/promises";
import readline from "node:readline/promises";
const fileName = "people.txt";
const dirPath = new URL("./../database/task-3", import.meta.url).pathname;

console.log(c.yellow.bold("LOGIN: "));
let rl = readline.createInterface({ input: process.stdin, output: process.stdout });
rl.on("SIGINT", closeProgram); //doesn't work on process.on('SIGINT')  SIGINT is emitted on ctrl+c press

let username = await rl.question(c.bgBlue.bold("login:") + " ");
let password = await rl.question(c.bgBlue.bold("password:") + " ");
if (!validateLogin(username, password)) {
  closeProgram(c.red("Neteisingi prisijungimo duomenys"));
}

chooseAction();

function validateLogin(username, password) {
  if (username.trim() !== "admin" || password.trim() !== "1234") {
    return false;
  }
  return true;
}

async function chooseAction() {
  /// do not quit after action, just keep cycling  between prompt for action and action until ctrl+c
  let action = "";
  while (!validateChoice(action)) {
    console.log(`Exit: ${c.bgBlue("Ctrl + C")}`);
    console.log(`Read: ${c.bgBlue("R")}`);
    console.log(`Write: ${c.bgBlue("W")}`);
    action = await rl.question(``);
  }
  action === "w" ? await writeDataToFile() : await readFileData();
  await chooseAction();
}
function validateChoice(action) {
  action = action.trim().toLowerCase();
  if (action === "r" || action === "read") return "r";
  if (action === "w" || action === "write") return "w";
  return "";
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
function closeProgram(msg = "") {
  // console.clear(); //to clear password and read history from logs. doesn't clear all console, only visible area
  // https://stackoverflow.com/questions/8813142/clear-terminal-window-in-node-js-readline-shell
  process.stdout.write("\u001b[H\u001b[2J\u001b[3J"); //clear terminal with the scrollback, ansi escape code sequence
  rl.close();
  console.log(msg);
  process.exit(0);
}
