import { Request, Response } from "express";
import { User } from "../models/user.model";
import { CommonErrors } from "../utils/common-errors";

// GET /
// @TODO: add filtering
export const findUsers = async (request: Request, response: Response) => {
  try {
    const { filters } = request.body;

    const users = await User.find(filters ?? {});

    return response.status(200).json(users);
  } catch (e) {
    return response.status(500).json({ error: e });
  }
};

// GET /{oid}
export const showUser = async (request: Request, response: Response) => {
  const { userId } = request.params;

  if (!userId) {
    return response.status(404).json({ error: CommonErrors.NotFound });
  }

  try {
    const user = await User.findById(userId);

    return response.status(200).json(user);
  } catch (e) {
    return response.status(500).json({ error: e });
  }
};

// GET /{firebaseID}
export const getUser = async (request: Request, response: Response) => {
  const { firebaseId } = request.params;

  if (!firebaseId) {
    console.log(firebaseId);
    return response.status(404).json({ error: CommonErrors.NotFound });
  }

  try {
    const user = await User.findOne({ firebaseUserId: firebaseId });

    return response.status(200).json(user);
  } catch (e) {
    return response.status(500).json({ error: e });
  }
};

// POST /
export const createUser = async (request: Request, response: Response) => {
  try {
    const user = new User(request.body);

    const validation = user.validateSync();

    if (validation) {
      return response.status(400).json({ error: validation.message });
    }

    await user.save();

    return response.status(200).json(user);
  } catch (e) {
    return response.status(500).json({ error: e });
  }
};

// PUT /{oid}
export const updateUser = async (request: Request, response: Response) => {
  const { userId } = request.params;

  if (!userId) {
    return response.status(400).json({ error: CommonErrors.BadRequest });
  }

  try {
    const user = await User.findById(userId);

    if (!user) {
      return response.status(404).json({ error: CommonErrors.NotFound });
    }

    const updatedFields = request.body;

    const result = await User.findByIdAndUpdate(userId, updatedFields);

    return response.status(204).send();
  } catch (e) {
    return response.status(500).json({ error: e });
  }
};

// DELETE /{oid}
export const deleteUser = async (request: Request, response: Response) => {
  const { userId } = request.params;

  if (!userId) {
    return response.status(400).json({ error: CommonErrors.BadRequest });
  }

  try {
    const user = await User.findById(userId);

    if (!user) {
      return response.status(400).json({ error: CommonErrors.NotFound });
    }

    const result = await User.deleteOne({ _id: user._id });

    return response.status(204).send();
  } catch (e) {
    return response.status(500).json({ error: e });
  }
};
