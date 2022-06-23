const mongoose = require('mongoose');

async function connect() {
  try {
    await mongoose.connect('mongodb://localhost:12345/ThinkAlpha_prod');
    console.log("database connected")
  } catch (error) {
    console.log("connected failure")
  }
}

module.exports = { connect }