const mongoose = require('mongoose');

const { Schema } = mongoose;

const propertySchema = new Schema(
  {
    propertyType: {
      type: String,
      required: true,
      enum: ['sale', 'rent'],
    },
    propertyName: {
      type: String,
      required: [true, 'property name required'],
      trim: true,
      min: 5,
      max: 30,
    },
    location: {
      type: String,
      required: [true, 'property address required'],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      min: 5,
      max: 300,
    },
    location_geoJSON: {
      type: {
        type: String,
        enum: ['Point'],
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
    valuation: {
      type: Number,
      required: true,
    },
    isSold: {
      type: Boolean,
      required: false,
      default: false,
    },
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 0 } }
);

const Property = mongoose.model('Property', propertySchema);

module.exports = Property;
