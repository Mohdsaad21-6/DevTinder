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

const validateEditProfileData=(req)=>{
  const allowedFields=["firstName","lastName","emailId","photoUrl","gender","age","about","skills"
  ]

  const isEditAllowed=Object.keys(req.body).every((field)=>
  allowedFields.includes(field)
  );
  return isEditAllowed;
}

module.exports = { validateSignupData ,validateEditProfileData};
