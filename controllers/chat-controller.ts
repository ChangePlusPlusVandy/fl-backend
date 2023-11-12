import express, { Request, Response } from "express";
import { Chat } from "../models/chat.model";

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
    return response.status(404).json({ error: "Not found" });
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

    if (validation !== null) {
      return response.status(400).json({ error: validation.message});
    }

    await chat.save();

    return response.status(200).json(chat);
  } catch (e) {
    return response.status(500).json({ error: e });
  }
};

// PUT /{oid}
export const updateChat = async (request: Request, response: Response) => {
  const { chatId } = request.params;

  if (!chatId) {
    return response.status(404).json({ error: "Invalid Chat ID" });
  }

  try {
    const chat = await Chat.findById(chatId);

    if (!chat) {
      return response.status(404).json({ error: "Not found" });
    }

    const replacement = new Chat(request.body);

    const validation = replacement.validateSync();

    if (validation !== null) {
      return response.status(400).json({ error: validation.message });
    }

    const result = await Chat.replaceOne({ _id: chatId }, replacement);

    return response.status(204).send();
  } catch (e) {
    return response.status(500).json({ error: e });
  }
};

// DELETE /{oid}
export const deleteChat = async (request: Request, response: Response) => {
  const { chatId } = request.params;

  if (!chatId) {
    return response.status(400).json({ error: "Invalid Chat ID" });
  }

  try {
    const chat = await Chat.findById(chatId);

    if (!chat) {
      return response.status(400).json({ error: "Not found" });
    }

    const result = await Chat.deleteOne({ _id: chat._id });

    return response.status(204).send();
  } catch (e) {
    return response.status(500).json({ error: e });
  }
};

