import { Request, Response } from "express";
import { Post } from "../models/post.model";
import { CommonErrors } from "../utils/common-errors";

// GET /
// @TODO: add filtering
export const findPosts = async (request: Request, response: Response) => {
  try {
    const { filters } = request.body;

    const posts = await Post.find(filters ?? {});

    return response.status(200).json(posts);
  } catch (e) {
    return response.status(500).json({ error: e });
  }
};

// GET /{oid}
export const showPost = async (request: Request, response: Response) => {
  const { postId } = request.params;

  if (!postId) {
    return response.status(404).json({ error: CommonErrors.NotFound });
  }

  try {
    const post = await Post.findById(postId);

    return response.status(200).json(post);
  } catch (e) {
    return response.status(500).json({ error: e });
  }
};

// POST /
export const createPost = async (request: Request, response: Response) => {
  try {
    const post = new Post(request.body);

    const validation = post.validateSync();

    if (validation) {
      return response.status(400).json({ error: validation.message });
    }

    await post.save();

    return response.status(200).json(post);
  } catch (e) {
    return response.status(500).json({ error: e });
  }
};

// PATCH /{oid}
export const updatePost = async (request: Request, response: Response) => {
  const { postId } = request.params;

  if (!postId) {
    return response.status(400).json({ error: CommonErrors.BadRequest });
  }

  try {
    const post = await Post.findById(postId);

    if (!post) {
      return response.status(404).json({ error: CommonErrors.NotFound });
    }

    const updatedFields = request.body;

    const result = await Post.findByIdAndUpdate(postId, request.body);

    return response.status(204).send();
  } catch (e) {
    return response.status(500).json({ error: e });
  }
};

// DELETE /{oid}
export const deletePost = async (request: Request, response: Response) => {
  const { postId } = request.params;

  if (!postId) {
    return response.status(400).json({ error: CommonErrors.BadRequest });
  }

  try {
    const post = await Post.findById(postId);

    if (!post) {
      return response.status(400).json({ error: CommonErrors.NotFound });
    }

    const result = await Post.deleteOne({ _id: post._id });

    return response.status(204).send();
  } catch (e) {
    return response.status(500).json({ error: e });
  }
};
