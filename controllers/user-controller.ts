import { Request, Response } from "express";
import { User } from "../models/user.model";

// GET /
// @TODO: add filtering
export const findUsers = async (request: Request, response: Response) => {
  try {
    const users = await User.find({});

    return response
      .status(200)
      .json(users);
  } catch (e) {
    return response
      .status(500)
      .json({ error: e });
  }
}

// GET /{oid}
export const showUser = async (request: Request, response: Response) => {
  const { userId } = request.params;

  if (!userId) {
    return response
      .status(404)
      .json({ error: 'Not found' });
  }

  try {
    const user = await User.findById(userId);

    return response
      .status(200)
      .json(user);
  } catch (e) {
    return response
      .status(500)
      .json({ error: e });
  }
}

// POST /
export const createUser = async (request: Request, response: Response) => {
  try {
    const user = new User(request.body);

    const validation = user.validateSync();

    if (validation !== null) {
      return response
        .status(400)
        .json({ error: validation.message });
    }

    await user.save();

    return response
      .status(200)
      .json(user);
  } catch (e) {
    return response
      .status(500)
      .json({ error: e });
  }
}

// PUT /{oid}
export const updateUser = async (request: Request, response: Response) => {
  const { userId } = request.params;

  if (!userId) {
    return response
      .status(404)
      .json({ error: 'Invalid User ID' });
  }

  try {
    const user = await User.findById(userId);

    if (!user) {
      return response
        .status(404)
        .json({ error: 'Not found' });
    }

    const replacement = new User(request.body);

    const validation = replacement.validateSync();

    if (validation !== null) {
      return response
        .status(400)
        .json({ error: validation.message });
    }

    const result = await User.replaceOne({ _id: userId }, replacement);

    return response
      .status(204)
      .send();
  } catch (e) {
    return response
      .status(500)
      .json({ error: e });
  }
}

// DELETE /{oid}
export const deleteUser = async (request: Request, response: Response) => {
  const { userId } = request.params;

  if (!userId) {
    return response
      .status(400)
      .json({ error: 'Invalid User ID' });
  }

  try {
    const user = await User.findById(userId);

    if (!user) {
      return response
        .status(400)
        .json({ error: 'Not found' });
    }

    const result = await User.deleteOne({ _id: user._id });

    return response
      .status(204)
      .send();
  } catch (e) {
    return response
      .status(500)
      .json({ error: e });
  }
}
