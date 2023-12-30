import express, { Request, Response } from "express";
import { Friend } from "../models/friend.model";
import { CommonErrors } from "../utils/common-errors";

// GET /
// @TODO: add filtering
export const findFriends = async (request: Request, response: Response) => {
  const { filter } = request.body;

  try {
    const friends = await Friend.find(filter ?? {});

    return response.status(200).json(friends);
  } catch (e) {
    return response.status(500).json({ error: e });
  }
};

// GET /{oid}
export const showFriend = async (request: Request, response: Response) => {
  const { friendId } = request.params;

  if (!friendId) {
    return response.status(404).json({ error: CommonErrors.NotFound });
  }

  try {
    const friend = await Friend.findById(friendId);

    return response.status(200).json(friend);
  } catch (e) {
    return response.status(500).json({ error: e });
  }
};

// POST /
export const createFriend = async (request: Request, response: Response) => {
  try {
    const friend = new Friend(request.body);

    const validation = friend.validateSync();

    if (validation) {
      return response.status(400).json({ error: validation?.message });
    }

    await friend.save();

    return response.status(200).json(friend);
  } catch (e) {
    console.log(e);
    return response.status(500).json({ error: e });
  }
};

// PATCH /{oid}
export const updateFriend = async (request: Request, response: Response) => {
  const { friendId } = request.params;

  if (!friendId) {
    return response.status(400).json({ error: CommonErrors.BadRequest });
  }

  try {
    const friend = await Friend.findById(friendId);

    if (!friend) {
      return response.status(404).json({ error: CommonErrors.NotFound });
    }

    const updatedFields = request.body;

    const result = await Friend.findByIdAndUpdate(friendId, updatedFields);

    return response.status(204).send();
  } catch (e) {
    console.log(e);
    return response.status(500).json({ error: e });
  }
};

// DELETE /{oid}
export const deleteFriend = async (request: Request, response: Response) => {
  const { friendId } = request.params;

  if (!friendId) {
    return response.status(400).json({ error: CommonErrors.BadRequest });
  }

  try {
    const friend = await Friend.findById(friendId);

    if (!friend) {
      return response.status(404).json({ error: CommonErrors.BadRequest });
    }

    const result = await Friend.deleteOne({ _id: friend._id });

    return response.status(204).send();
  } catch (e) {
    return response.status(500).json({ error: e });
  }
};
