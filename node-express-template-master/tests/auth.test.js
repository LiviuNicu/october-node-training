const userModel = require("../models/user.model").User;
const userModelFunctions = require("../models/user.model");
const mongoose = require("mongoose");

describe("user model tests", function () {
  beforeAll(async function () {
    await mongoose.connect(
      "mongodb+srv://liviu:liviu@fmi.petdf.mongodb.net/jest?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      }
    );
  });

  test("User is inserted successfully into the database", async function () {
    const user = {
      email: "test_" + new Date().getTime() + "@test.com",
      firstName: "test user",
      lastName: "test last name",
      password: "12345",
    };

    const validUser = new userModel(user);
    const insertedUser = await validUser.save();

    expect(insertedUser._id).toBeDefined();
    expect(insertedUser.dateAdded).toBeDefined();
    expect(insertedUser.firstName).toBe(user.firstName);
    expect(insertedUser.email).toBe(user.email);
    expect(insertedUser.lastName).toBe(user.lastName);
    expect(insertedUser.password).toBe(user.password);
  });

  test("Login works", async function () {
    const user = {
      email: "test_" + new Date().getTime() + "@test.com",
      firstName: "test user",
      lastName: "test last name",
      password: "12345",
    };

    await userModelFunctions.register(user);

    const loginResponse = await userModelFunctions.login({
      email: user.email,
      password: user.password,
    });
    expect(loginResponse.token).toBeDefined();
  });
});
