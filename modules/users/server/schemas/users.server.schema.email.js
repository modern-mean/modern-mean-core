'use strict';

import mongoose from 'mongoose';
import validator from 'validator';

let Schema = mongoose.Schema;

/**
 * A Validation function for local strategy email
 */
let validateEmail = function (email) {
  return validator.isEmail(email, { require_tld: false });
};

/**
 * User Schema
 */
let EmailSchema = new Schema({
  email: {
    type: String,
    lowercase: true,
    trim: true,
    required: true,
    validate: [validateEmail, 'Please fill a valid email address']
  },
  primary: {
    type: Boolean,
    required: true,
    default: false
  },
  timestamps: {
    updated: {
      type: Date
    },
    created: {
      type: Date,
      default: Date.now
    }
  }
});

/**
* PreSave
*/
EmailSchema.pre('save', function (next) {
  this.timestamps.updated = Date.now;
  next();
});


EmailSchema.index({ email: 1 });


export default EmailSchema;
