const { json } = require('express');
const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate')
const Int32 = require("mongoose-int32").loadType(mongoose)

const UserSchema = new mongoose.Schema({
  givenname: {
    type: String, default: null
  },
  familyname: {
    type: String, default: null
  },
  username: {
    type: String, required: true
  },
  phone: {
    type: Int32, default: null
  },
  address: {
    type: String, default: null
  },
  client_email: {
    type: String, default: null
  },
  private_key: {
    type: String, default: null
  },
  role: {
    type: String, default: 'standard'
  },
  hash: {
    type: String
  },
  salt: {
    type: String
  }
});

UserSchema.plugin(findOrCreate)

module.exports = mongoose.model('User', UserSchema);
