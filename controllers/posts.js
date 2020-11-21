import PostModal from "../models/Post.js";

export const getPosts = async (req, res) => {
  try {
    const posts = await PostModal.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(404).json({ message: error.message });
    console.log(error);
  }
};

export const createPost = async (req, res) => {
  if (!req.userId) {
    res.json({ message: "Unauthenticated" });
  }
  const post = req.body;
  if (post.name.trim() === "") {
    return res.status(400).json({ name: "Required" });
  } else if (post.title.trim() === "") {
    return res.status(400).json({ title: "Required" });
  } else if (post.message.trim() === "") {
    return res.status(400).json({ message: "Required" });
  } else if (post.tags.length === 0) {
    return res.status(400).json({ tags: "Required" });
  } else if (post.image === "") {
    return res.status(400).json({ image: "Please upload an image" });
  }
  try {
    const newPost = await PostModal.create({
      ...post,
      creator: req.userId,
      createdAt: new Date().toISOString(),
    });
    res.status(201).send(newPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
    console.log(error);
  }
};

export const updatePost = async (req, res) => {
  if (!req.userId) {
    res.json({ message: "Unauthenticated" });
  }
  const { id: _id } = req.params;
  const body = req.body;
  if (body.title.trim() === "") {
    return res.status(400).json({ title: "Required" });
  }
  if (body.message.trim() === "") {
    return res.status(400).json({ message: "Required" });
  }
  if (body.tags.length === 0) {
    return res.status(400).json({ tags: "Required" });
  }
  try {
    const post = await PostModal.find({ _id: id });
    if (post.creator != req.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const updatedPost = await PostModal.findByIdAndUpdate(_id, body, {
      new: true,
    });
    res.status(200).json(updatedPost);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "update not successful" });
  }
};

export const deletePost = async (req, res) => {
  if (!req.userId) {
    res.status(400).json({ message: "Unauthenticated" });
  }
  const { id } = req.params;
  try {
    const post = await PostModal.findOne({ _id: id });
    if (post.creator !== req.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    await PostModal.findByIdAndDelete(id);
    res.status(200).json({ message: "deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: "delete not successful" });
  }
};

export const likePost = async (req, res) => {
  const { id } = req.params;
  const post = await PostModal.findById(id);
  const updatedPost = await PostModal.findByIdAndUpdate(
    id,
    {
      likes: post.likes + 1,
    },
    { new: true }
  );
  res.json(updatedPost);
  try {
  } catch (error) {
    res.json({ message: " like failed" });
  }
};
