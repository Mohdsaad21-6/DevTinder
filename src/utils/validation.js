const validator = require("validator");

const validateSignupData = (req) => {
  const { firstName, lastName, password, emailId } = req.body;

  if (!firstName || !lastName) {
    throw new Error("Name is not valid");
  }else if (!validator.isEmail(emailId)) {
    throw new Error("Invalid emailId ");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Enter a strong password");
  }
};

module.exports = { validateSignupData };
