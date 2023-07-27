const mongoose = require("mongoose");
//import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 30,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 30,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 5,
    maxlength: 100,
  },
  company: {
    type: String,
    required: true,
    trim: true,
  },
  company_size: {
    type: String,
    required: true,
    enum: ['Self-employed', '1-10 employees', '11-50 employees', '51-200 employees', '201-500 employees', '501-1000 employees', '1001-5000 employees', '5001-10000 employees', '10001+ employees'],
    default: '11-50 employees'
  },
  avatar: {
    type: String,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024,
  },
});

module.exports = mongoose.model("User", userSchema);
