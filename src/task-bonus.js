import { generateRandomUserDataString as newEntry } from "./generateRandomUserDataString.js";
import c from "chalk";
import { writeFile, mkdir, readFile } from "node:fs/promises";
import readline from "node:readline/promises";
const fileName = "registration.json";
const dirPath = new URL("./../database/task-bonus", import.meta.url).pathname;

let rl = readline.createInterface({ input: process.stdin, output: process.stdout });
rl.on("SIGINT", closeProgram); //doesn't work on process.on('SIGINT')  SIGINT is emitted on ctrl+c press

async function mainFunc() {
  console.log(c.dim("Exit: Ctrl + C"));
  console.log(c.yellow.bold("Enter your details: "));
  let details = await getUserDetails();
  let currentData = JSON.parse(await readFileData());
  console.log(typeof currentData, currentData);
  currentData.push(details);
  console.log(currentData);
  await writeDataToFile(JSON.stringify(currentData));
  closeProgram(c.green("Duomenys faile sėkmingai išsaugoti"));
}

async function getUserDetails() {
  let userDetails = {
    name: await getValidInput.name(),
    lastName: await getValidInput.lastName(),
    password: await getValidInput.password(),
    email: await getValidInput.email(),
    birthday: await getValidInput.birthday(),
  };
  return userDetails;
}

const getValidInput = {
  name: async function () {
    let name = "";
    let errorMsg = "";
    while (!name) {
      if (errorMsg) console.log(c.red(errorMsg));
      name = (await rl.question(c.bgBlue.bold("Your name:") + " ")).trim();
      if (!name) {
        errorMsg = "Name can't be empty";
      }
    }
    return name;
  },
  lastName: async function () {
    let lastName = "";
    let errorMsg = "";
    while (!lastName) {
      if (errorMsg) console.log(c.red(errorMsg));
      lastName = (await rl.question(c.bgBlue.bold("Your last name:") + " ")).trim();
      if (!lastName) {
        errorMsg = "Last name can't be empty";
      }
    }
    return lastName;
  },
  password: async function () {
    let password = "";
    let errorMsg = "";
    while (!password) {
      if (errorMsg) console.log(c.red(errorMsg));
      password = (await rl.question(c.bgBlue.bold("Your password:") + " ")).trim();
      if (!password) {
        errorMsg = "Password can't be empty";
      }
    }
    return password;
  },
  email: async function () {
    let email = "";
    let errorMsg = "";
    while (!email) {
      if (errorMsg) console.log(c.red(errorMsg));
      email = (await rl.question(c.bgBlue.bold("Your email address:") + " ")).trim();
      if (!email) {
        errorMsg = "Email can't be empty";
      }
    }
    return email;
  },
  birthday: async function () {
    let birthday = "";
    let errorMsg = "";
    while (!birthday) {
      if (errorMsg) console.log(c.red(errorMsg));
      birthday = (await rl.question(c.bgBlue.bold("Your birthday:") + " ")).trim();
      if (!birthday) {
        errorMsg = "Birthday can't be empty";
      }
    }
    return birthday;
  },
};
mainFunc();

async function writeDataToFile(data) {
  try {
    await mkdir(dirPath, { recursive: true });
    await writeFile(`${dirPath}/${fileName}`, data); ///kelias ne nuo sito failo, bet nuo project rooto??...
    // console.log(c.green("Duomenys faile sėkmingai išsaugoti"));
  } catch (err) {
    console.error(err);
  }
}

async function readFileData() {
  try {
    // await mkdir(dirPath, { recursive: true });
    return await readFile(`${dirPath}/${fileName}`);
  } catch (err) {
    console.log("chould add empty");
    return "[]"; //if file empty or not created
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
