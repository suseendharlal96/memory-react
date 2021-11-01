import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  title: { type: String, required: true },
  message: { type: String, required: true },
  name: { type: String, required: true },
  creator: { type: String, required: true },
  tags: { type: [String], required: true },
  image: { type: String, required: true },
  s3Key: { type: String, required: true },
  comments: { type: [String], default: [] },
  likes: { type: [String], default: [] },
  createdAt: { type: Date, default: new Date().toISOString() },
});

export default mongoose.model("Post", postSchema);
