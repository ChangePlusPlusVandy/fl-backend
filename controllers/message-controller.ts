import express, { Request, Response } from "express";
import { Message } from "../models/message.model";
import { CommonErrors } from "../utils/common-errors";

// GET that returns all messages in the database
export const getAllMessages = async (request: Request, response: Response) => {
  try {
    const messages = await Message.find({});

    return response.status(200).json(messages);
  } catch (e) {
    return response.status(500).json({ error: e });
  }
};

// GET /{oid}
export const getMessage = async (request: Request, response: Response) => {
  const { messageId } = request.params;

  if (!messageId) {
    return response.status(404).json({ error: CommonErrors.NotFound });
  }

  try {
    const message = await Message.findById(messageId);

    return response.status(200).json(message);
  } catch (e) {
    return response.status(500).json({ error: e });
  }
};

// POST /
export const createMessage = async (request: Request, response: Response) => {
  try {
    const message = new Message(request.body);

    const validation = message.validateSync();

    if (validation) {
      return response.status(400).json({ error: validation.message });
    }

    await message.save();

    return response.status(200).json(message);
  } catch (e) {
    return response.status(500).json({ error: e });
  }
};

// PATCH /{oid}
export const updateMessage = async (request: Request, response: Response) => {
  const { messageId } = request.params;

  if (!messageId) {
    return response.status(404).json({ error: CommonErrors.InvalidID });
  }

  try {
    const message = await Message.findById(messageId);

    if (!message) {
      return response.status(404).json({ error: CommonErrors.NotFound });
    }

    const updatedFields = request.body;

    const result = await Message.findByIdAndUpdate(messageId, updatedFields);

    return response.status(204).send();
  } catch (e) {
    return response.status(500).json({ error: e });
  }
};

// DELETE /{oid}
export const deleteMessage = async (request: Request, response: Response) => {
  const { messageId } = request.params;

  if (!messageId) {
    return response.status(400).json({ error: CommonErrors.InvalidID });
  }

  try {
    const message = await Message.findById(messageId);

    if (!message) {
      return response.status(400).json({ error: CommonErrors.NotFound });
    }

    const result = await Message.deleteOne({ _id: message._id });

    return response.status(204).send();
  } catch (e) {
    return response.status(500).json({ error: e });
  }
};
