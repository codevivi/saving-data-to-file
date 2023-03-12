import c from "chalk";
import { writeFile, mkdir, readFile } from "node:fs/promises";
import readline from "node:readline/promises";
import { validate } from "./validations.js";

const fileName = "registration.json";
const dirPath = new URL("./../database/task-bonus", import.meta.url).pathname;
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
/// close program by clearing console on ctrl+c
rl.on("SIGINT", closeProgram); //doesn't work on process.on('SIGINT')  SIGINT is emitted on ctrl+c press

/// Intro messages
printIntro();

/// Get registration inputs
let details = await getUserDetails();

/// Read  adn parse current file data
let currentData = JSON.parse(await readFileData());

/// Append new data to array
currentData.push(details);

/// Save new updated array to file as json
await writeDataToFile(JSON.stringify(currentData));

/// Log Success message
closeProgram(c.green("Duomenys faile sėkmingai išsaugoti"));

async function getUserDetails() {
  let userDetails = {
    name: await getValidInput("Your name: ", [validate.isMaxLength(50)]),
    lastName: await getValidInput("Your last name ", [validate.isMaxLength(50)]),
    password: await getValidInput("Your password: ", [validate.isMinLength(9), validate.isMaxLength(50)]),
    email: await getValidInput("Your email address: ", [validate.isValidEmail]),
    birthday: await getValidInput("Your birthday YYYY-MM-DD: ", [validate.isValidBirthdayFormat]),
  };
  return userDetails;
}

async function getValidInput(questionStr, validateArr = []) {
  validateArr = [validate.isNotEmpty, ...validateArr]; //add default check for empty values
  let input = "";
  let errorMsg = "";
  while (!input) {
    if (errorMsg) console.log(c.red(errorMsg));
    let rawInput = (await rl.question(c.bgBlue.bold(questionStr))).trim();
    try {
      validateArr.forEach((validateFunc) => {
        input = "";
        input = validateFunc(rawInput);
      });
    } catch (validationError) {
      errorMsg = validationError.message;
    }
  }
  return input;
}

async function writeDataToFile(data) {
  try {
    await mkdir(dirPath, { recursive: true });
    await writeFile(`${dirPath}/${fileName}`, data);
  } catch (err) {
    console.error(c.red(err.message));
  }
}

async function readFileData() {
  try {
    return await readFile(`${dirPath}/${fileName}`);
  } catch (err) {
    return "[]"; //if file empty or not created
  }
}

function printIntro() {
  console.clear();
  console.log(c.yellow.bold(`     REGISTRATION`));
  console.log(c.dim("Exit: Ctrl + C"));
  console.log(c.yellow.bold("Enter your details: "));
}

function closeProgram(msg = "") {
  // console.clear(); //to clear password and read history from logs. doesn't clear all console, only visible area
  // https://stackoverflow.com/questions/8813142/clear-terminal-window-in-node-js-readline-shell
  process.stdout.write("\u001b[H\u001b[2J\u001b[3J"); //clear terminal with the scrollback, ansi escape code sequence
  rl.close();
  console.log(msg);
  process.exit(0);
}
