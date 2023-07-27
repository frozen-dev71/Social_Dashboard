const Validator = require("validator");

const lengthInput = function (inputName, min, max, errorMessage) {
  if (!Validator.isLength(inputName, { min, max })) return errorMessage;
};

const registerValidation = (data) => {
  const { firstName, lastName, email, company, company_size, password } = data;
  let errors = {};

  // Length input value validation
  errors.firstName = lengthInput(
    firstName,
    3,
    30,
    "Name should be between 2 and 30 characters"
  );
  errors.lastName = lengthInput(
    lastName,
    3,
    30,
    "Name should be between 2 and 30 characters"
  );
  errors.email = lengthInput(
    email,
    5,
    100,
    "The email field must be greater than 5 characters"
  );
  errors.password = lengthInput(
    password,
    5,
    1024,
    "The password field must be greater than 5 characters"
  );
  // Email validate format
  if (!Validator.isEmail(email)) errors.email = "Email format is incorrect";
  // Empty validation
  if (Validator.isEmpty(firstName)) errors.firstName = "Name field is required";
  if (Validator.isEmpty(lastName)) errors.lastName = "Name field is required";
  if (Validator.isEmpty(email)) errors.email = "Email field is required";
  if (Validator.isEmpty(company)) errors.company = "Company field is required";
  if (Validator.isEmpty(company_size)) errors.company_size = "Company size field is required";
  if (Validator.isEmpty(password))
    errors.password = "Password field is required";

  // if each key of errors is undefined, we must empty the objects
  if (
    !errors.firstName &&
    !errors.lastName &&
    !errors.email &&
    !errors.password &&
    !errors.company &&
    !errors.company_size
  )
    errors = {};

  return {
    errors,
    isValid: Object.keys(errors).length,
  };
};

module.exports = registerValidation;
