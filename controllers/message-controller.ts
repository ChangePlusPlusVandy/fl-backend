import express, { Request, Response } from "express";
import { Message } from "../models/message.model";

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
    return response.status(404).json({ error: "Not found" });
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

    if (validation !== null) {
      return response.status(400).json({ error: validation.message });
    }

    await message.save();

    return response.status(200).json(message);
  } catch (e) {
    return response.status(500).json({ error: e });
  }
};

// PUT /{oid}
export const updateMessage = async (request: Request, response: Response) => {
  const { messageId } = request.params;

  if (!messageId) {
    return response.status(404).json({ error: "Invalid Message ID" });
  }

  try {
    const message = await Message.findById(messageId);

    if (!message) {
      return response.status(404).json({ error: "Not found" });
    }

    const replacement = new Message(request.body);

    const validation = replacement.validateSync();

    if (validation !== null) {
      return response.status(400).json({ error: validation.message });
    }

    const result = await Message.replaceOne({ _id: messageId }, replacement);

    return response.status(204).send();
  } catch (e) {
    return response.status(500).json({ error: e });
  }
};

// DELETE /{oid}
export const deleteMessage = async (request: Request, response: Response) => {
  const { messageId } = request.params;

  if (!messageId) {
    return response.status(400).json({ error: "Invalid Message ID" });
  }

  try {
    const message = await Message.findById(messageId);

    if (!message) {
      return response.status(400).json({ error: "Not found" });
    }

    const result = await Message.deleteOne({ _id: message._id });

    return response.status(204).send();
  } catch (e) {
    return response.status(500).json({ error: e });
  }
};
