const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
//creating user shcema
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  // Other user fields can go here
});

const SALT_ROUNDS = 10;

// Hash the password before saving to the database
userSchema.pre('save', async function (next) {
  try {
    if (!this.isModified('password')) return next();

    // Hash the password before saving
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    return next(err);
  }
});

// Compare provided password with the hashed password stored in the database
userSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (err) {
    throw new Error('Comparison failed');
  }
};

const User = mongoose.model('User', userSchema);

module.exports = User;
