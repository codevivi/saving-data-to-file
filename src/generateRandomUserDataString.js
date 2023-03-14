import { faker } from "@faker-js/faker";
import { rand } from "./helpers.js";

export function generateRandomUserDataString() {
  const sex = rand(0, 1) ? "female" : "male";
  const firstName = faker.name.firstName(sex);
  const lastName = faker.name.lastName(sex);
  const email = faker.internet.email(firstName, lastName);
  const password = faker.internet.password(9, true);
  const birthDate = faker.date.birthdate({ min: 13, max: 115, mode: "age" }).toLocaleDateString("lt-LT");

  return `${firstName}, ${lastName}, ${password}, ${email}, ${birthDate}\n`;
}
