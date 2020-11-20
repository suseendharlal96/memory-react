import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  title: { type: String, required: true },
  message: { type: String, required: true },
  creator: { type: String, required: true },
  tags: { type: [String], required: true },
  image: { type: String, required: true },
  likes: { type: Number, default: 0 },
  createdAt: { type: Date, default: new Date().toISOString() },
});

export default mongoose.model("Post", postSchema);
