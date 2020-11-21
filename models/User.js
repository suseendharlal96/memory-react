import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  profile: { type: String },
});

export default mongoose.model("User", userSchema);
