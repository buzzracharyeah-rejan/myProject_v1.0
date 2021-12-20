const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    userType: {
      type: String,
      required: [true, 'user role required'],
      default: 'buyer',
      enum: ['admin', 'buyer', 'seller'],
    },
    firstname: {
      type: String,
      required: [true, 'firstname required'],
      trim: true,
      minlength: 5,
      maxlength: 30,
    },

    lastname: {
      type: String,
      required: [true, 'lastname required'],
      trim: true,
      minlength: 5,
      maxlength: 30,
    },
    email: {
      type: String,
      required: [true, 'email is required'],
      trim: true,
      unique: true,
      // validate: {
      //   validator: function (email) {
      //     return Validator.isEmail();
      //   },
      //   message: (props) => `${props.email} is not a valid email`,
      // },
    },
    password: {
      type: String,
      required: [true, 'password required'],
      trim: true,
      validate: function (password) {},
    },
    contactNumber: {
      type: Number,
      required: false,
    },
    displayAddress: {
      type: String,
      required: [true, 'dislay address required'],
      trim: true,
    },
    emailVerifiedAt: {
      type: Date,
      required: false,
      default: null,
    },
    isFirstLogin: {
      type: Date,
      required: false,
      default: null,
    },
    lastLoginAt: {
      type: Date,
      required: false,
      default: null,
    },
    properties: [{ type: Schema.Types.ObjectId, ref: 'Property' }],
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 0 } }
);

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

userSchema.statics.validatePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
