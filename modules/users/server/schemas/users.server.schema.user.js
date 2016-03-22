import mongoose from 'mongoose';
import crypto from 'crypto';
import validator from 'validator';
import generatePassword from 'generate-password';
import owasp from 'owasp-password-strength-test';

import Provider from './users.server.schema.provider';
import Email from './users.server.schema.email';

let Schema = mongoose.Schema;

/**
 * User Schema
 */
let UserSchema = new Schema({
  emails: [Email],
  name: {
    first: {
      type: String,
      trim: true,
      required: 'Please provide a first name'
    },
    last: {
      type: String,
      trim: true,
      required: 'Please provide a last name'
    }
  },
  profileImageURL: {
    type: String,
    default: '/dist/img/users/client/img/profile/default.png'
  },
  providers: [Provider],
  roles: {
    type: Array,
    default: ['user']
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


/*
*Virtuals
*/
UserSchema.virtual('name.full')
  .get(function () {
    return this.name.first + ' ' + this.name.last;
  });

/**
 * PreSave
 */
UserSchema.pre('save', function (next) {
  this.timestamps.updated = Date.now;
  next();
});

UserSchema.set('toJSON', {
  virtuals: true
});


export default UserSchema;
