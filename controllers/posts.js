import PostModal from "../models/Post.js";

export const getPosts = async (req, res) => {
  try {
    const posts = await PostModal.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(404).json({ message: error.message });
    console.log(error);
    res.status(404).json({ message: error.message });
    console.log(error);
  }
};

export const createPost = async (req, res) => {
  const post = req.body;
  try {
    const newPost = await PostModal.create({
      ...post,
      createdAt: new Date().toISOString(),
    });
    res.status(201).send(newPost);
  } catch (error) {
    res.status(404).json({ message: error.message });
    console.log(error);
  }
};

export const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body;
  try {
    const updatedPost = await PostModal.findByIdAndUpdate(_id, post, {
      new: true,
    });
    res.json(updatedPost);
  } catch (error) {
    console.log(error);
    res.json({ message: "update not successful" });
  }
};

export const deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    await PostModal.findByIdAndDelete(id);
    res.json({ message: "deleted successfully" });
  } catch (error) {
    res.json({ message: "delete not successful" });
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
