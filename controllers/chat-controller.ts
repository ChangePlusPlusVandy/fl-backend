import express, { Request, Response } from "express";
import { Chat } from "../models/chat.model";
import { CommonErrors } from "../utils/common-errors";
import { User } from "../models/user.model";

// GET that returns all chats in the database
export const getAllChats = async (request: Request, response: Response) => {
  try {
    const chats = await Chat.find({});

    return response.status(200).json(chats);
  } catch (e) {
    return response.status(500).json({ error: e });
  }
};

// GET /{oid}
export const getChat = async (request: Request, response: Response) => {
  const { chatId } = request.params;

  if (!chatId) {
    return response.status(404).json({ error: CommonErrors.NotFound });
  }

  try {
    const chat = await Chat.findById(chatId);

    return response.status(200).json(chat);
  } catch (e) {
    return response.status(500).json({ error: e });
  }
};

// POST /
export const createChat = async (request: Request, response: Response) => {
  try {
    const chat = new Chat(request.body);

    const validation = chat.validateSync();

    if (validation) {
      return response.status(400).json({ error: validation.message });
    }

    await chat.save();

    const user1 = await User.findById(chat.user1);
    user1?.chats.push(chat._id);

    const user2 = await User.findById(chat.user2);
    user2?.chats.push(chat._id);

    return response.status(200).json(chat);
  } catch (e) {
    return response.status(500).json({ error: e });
  }
};

// PATCH /{oid}
export const updateChat = async (request: Request, response: Response) => {
  const { chatId } = request.params;

  if (!chatId) {
    return response.status(404).json({ error: CommonErrors.InvalidID });
  }

  try {
    const chat = await Chat.findById(chatId);

    if (!chat) {
      return response.status(404).json({ error: CommonErrors.NotFound });
    }

    const updatedFields = request.body;

    const result = await Chat.findByIdAndUpdate(chatId, updatedFields);

    return response.status(204).send();
  } catch (e) {
    return response.status(500).json({ error: e });
  }
};

// DELETE /{oid}
export const deleteChat = async (request: Request, response: Response) => {
  const { chatId } = request.params;

  if (!chatId) {
    return response.status(400).json({ error: CommonErrors.InvalidID });
  }

  try {
    const chat = await Chat.findById(chatId);

    if (!chat) {
      return response.status(400).json({ error: CommonErrors.NotFound });
    }

    const result = await Chat.deleteOne({ _id: chat._id });

    return response.status(204).send();
  } catch (e) {
    return response.status(500).json({ error: e });
  }
};
