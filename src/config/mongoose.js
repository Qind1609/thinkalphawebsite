const mongoose = require('mongoose');

async function connect() {
  try {
    await mongoose.connect('mongodb+srv://thanhnhan:admin@cluster0.mdaop.mongodb.net/?retryWrites=true&w=majority');
    console.log("database connected")
  } catch (error) {
    console.log("connected failure")
  }
}

module.exports = { connect }