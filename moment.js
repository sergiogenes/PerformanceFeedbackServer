const User = require("./models/User");

const fakeDataUsers = {
  firstName: "Marco",
  lastName: "Polo",
  password: "12345678",
  email: "marco@mail.com",
  isAdmin: true,
  fileNumber: "AR-12345",
  shift: "morning",
};

User.create(fakeDataUsers);
