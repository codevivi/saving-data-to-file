import { isNotEmail } from "sane-email-validation";
import moment from "moment";
export const validate = {
  isNotEmpty: function (value) {
    if (!value) {
      throw new Error("Can't be empty");
    }
    return value;
  },
  isValidEmail: function (value) {
    if (isNotEmail(value)) {
      throw new Error("Provide valid email address");
    }
    return value;
  },
  isValidBirthdayFormat: function (value) {
    if (!moment(value, "YYYY-MM-DD", true).isValid()) {
      throw new Error("Use YYYY-MM-DD format and provide real date");
    }
    let yearNow = new Date().getFullYear();
    let inputYear = new Date(value).getFullYear();
    let age = yearNow - inputYear;
    if (age < 0) {
      throw new Error("Your birthday can't be in a future");
    }
    if (age > 150) {
      throw new Error(`Congratulation for reaching ${age} years age, but this application was not designed for that yet. Please contact us personally.`);
    }
    if (age < 13) {
      throw new Error("You must be at least 13 years old to register");
    }
    return value;
  },
  isMaxLength: function (len) {
    return function (value) {
      if (value.length > len) {
        throw new Error(`Max ${len} characters`);
      }
      return value;
    };
  },
  isMinLength: function (len) {
    return function (value) {
      if (value.length < len) {
        throw new Error(`Min ${len} characters`);
      }
      return value;
    };
  },
};
