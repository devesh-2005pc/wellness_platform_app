import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password_hash: { type: String, required: true },
  created_at: { type: Date, default: Date.now }
});



// Custom method to compare password
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password_hash);
};

const User = mongoose.model('User', userSchema);
export default User;
