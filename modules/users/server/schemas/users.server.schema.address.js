'use strict';

import mongoose from 'mongoose';
import validator from 'validator';

let Schema = mongoose.Schema;

let AddressSchema = new Schema({
  streetAddress: {
    type: String,
    trim: true,
    required: true
  },
  extendedAddress: {
    type: String,
    trim: true
  },
  locality: {
    type: String,
    trim: true,
    required: true
  },
  region: {
    type: String,
    trim: true,
    required: true
  },
  postalCode: {
    type: String,
    trim: true,
    required: true
  },
  country: {
    type: String,
    trim: true,
    required: true
  },
  addressType: {
    type: String,
    enum: ['Shipping', 'Billing']
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
AddressSchema.pre('save', function (next) {
  if (this.isModified()) {
    this.timestamps.updated = Date.now();
  }
  
  next();
});

export default AddressSchema;
