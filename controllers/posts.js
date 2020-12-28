import dotenv from "dotenv";
dotenv.config();
import AWS from "aws-sdk";
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
    return res.json({ message: "Unauthenticated" });
  }
  const post = req.body;
  const file = req.file;
  if (post && post.title[0].trim() === "") {
    return res.status(400).json({ name: "Required" });
  } else if (post && post.title[1].trim() === "") {
    return res.status(400).json({ title: "Required" });
  } else if (post && post.message.trim() === "") {
    return res.status(400).json({ message: "Required" });
  } else if (post && post.tags.length === 0) {
    return res.status(400).json({ tags: "Required" });
  } else if (!file) {
    return res.status(400).json({ image: "Please upload an image" });
  }
  const s3FileUrl = process.env.FILE_URL;
  const s3Bucket = new AWS.S3({
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_KEY,
    region: process.env.REGION,
  });
  const params = {
    Bucket: process.env.BUCKET_NAME,
    Key: post.title[1],
    Body: file.buffer,
    ContentType: file.mimetype,
    ACL: "public-read",
  };
  s3Bucket.upload(params, async (err, data) => {
    if (err) {
      res.status(500).json({ error: true, Message: err });
    } else {
      try {
        const newPost = await PostModal.create({
          ...post,
          creator: req.userId,
          name: post.title[0],
          title: post.title[1],
          image: s3FileUrl + post.title[1],
          s3Key: params.Key,
          createdAt: new Date().toISOString(),
        });
        res.status(201).send(newPost);
      } catch (error) {
        res.status(400).json({ message: error.message });
        console.log(error);
      }
    }
  });
};

export const updatePost = async (req, res) => {
  if (!req.userId) {
    return res.json({ message: "Unauthenticated" });
  }
  const { id: _id } = req.params;
  const body = req.body;
  const file = req.file;
  if (body && body.title[0].trim() === "") {
    return res.status(400).json({ name: "Required" });
  }
  if (body && body.title[1].trim() === "") {
    return res.status(400).json({ title: "Required" });
  }
  if (body && body.message.trim() === "") {
    return res.status(400).json({ messages: "Required" });
  }
  if (body && body.tags.length === 0) {
    return res.status(400).json({ tags: "Required" });
  }
  try {
    const post = await PostModal.findOne({ _id });
    if (post.creator !== req.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    let updatedPost;
    if (file) {
      const s3FileUrl = process.env.FILE_URL;
      const s3Bucket = new AWS.S3({
        accessKeyId: process.env.ACCESS_KEY,
        secretAccessKey: process.env.SECRET_KEY,
        region: process.env.REGION,
      });
      const updatedparams = {
        Bucket: process.env.BUCKET_NAME,
        Key: Math.random().toString(),
        Body: file.buffer,
        ContentType: file.mimetype,
        ACL: "public-read",
      };
      const oldparams = {
        Bucket: process.env.BUCKET_NAME,
        Key: post.s3Key,
      };
      s3Bucket.deleteObject(oldparams, async (err, data) => {
        if (err) {
          console.log(err);
        } else {
        }
      });
      s3Bucket.upload(updatedparams, async (err, data) => {
        if (err) {
          res.status(500).json({ error: true, Message: err });
        } else {
          console.log(data);
          updatedPost = await PostModal.findByIdAndUpdate(
            _id,
            {
              ...body,
              name: body.title[0],
              title: body.title[1],
              image: s3FileUrl + updatedparams.Key,
              s3Key: updatedparams.Key,
            },
            {
              new: true,
            }
          );
          res.status(200).json(updatedPost);
        }
      });
    } else {
      updatedPost = await PostModal.findByIdAndUpdate(
        _id,
        { ...body, name: post.title[0], title: post.title[1] },
        {
          new: true,
        }
      );
      res.status(200).json(updatedPost);
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "update not successful" });
  }
};

export const updatePostWithoutFile = async (req, res) => {
  if (!req.userId) {
    return res.json({ message: "Unauthenticated" });
  }
  const { id: _id } = req.params;
  const body = req.body;
  if (body.title.trim() === "") {
    return res.status(400).json({ title: "Required" });
  }
  if (body.message.trim() === "") {``
    return res.status(400).json({ messages: "Required" });
  }
  if (body.tags.length === 0) {
    return res.status(400).json({ tags: "Required" });
  }
  try {
    const post = await PostModal.findOne({ _id });
    if (post.creator !== req.userId) {
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
    return res.json({ message: "Unauthenticated" });
  }
  const { id } = req.params;
  try {
    const post = await PostModal.findOne({ _id: id });
    if (post.creator !== req.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    // first delete the object in s3 bucket
    let s3bucket = new AWS.S3({
      accessKeyId: process.env.ACCESS_KEY,
      secretAccessKey: process.env.SECRET_KEY,
      region: process.env.REGION,
    });

    let params = {
      Bucket: process.env.BUCKET_NAME,
      Key: post.s3Key,
    };
    s3bucket.deleteObject(params, async (err, data) => {
      if (err) {
        console.log(err);
      } else {
        // now delete in DB
        await PostModal.findByIdAndDelete(id);
        res.status(200).json({ message: "deleted successfully" });
      }
    });
  } catch (error) {
    res.status(400).json({ message: "delete not successful" });
  }
};

export const likePost = async (req, res) => {
  if (!req.userId) {
    return res.json({ message: "Unauthenticated" });
  }
  const { id } = req.params;
  const post = await PostModal.findById(id);
  if (!post) {
    return res.status(400).json({ message: "Post not found" });
  }
  const index = post.likes.findIndex((id) => id === req.userId);
  if (index === -1) {
    post.likes.push(req.userId);
  } else {
    post.likes = post.likes.filter((id) => id !== req.userId);
  }
  const updatedPost = await PostModal.findByIdAndUpdate(id, post, {
    new: true,
  });
  res.status(200).json(updatedPost);
  try {
  } catch (error) {
    res.json({ message: " like failed" });
  }
};
