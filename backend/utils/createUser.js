const { User } = require("../models/user.model");

async function createUser() {
  try {
    const user = new User({ username: 'diaries', password: 'diary1234' });
    const savedUser = await user.save();
  } catch (error) {
    console.error("Error while registering user", error.message);
  }
}


module.exports = { createUser };