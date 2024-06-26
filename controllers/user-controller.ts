import { Request, Response } from "express";
import { User } from "../models/user.model";
import { Post } from "../models/post.model";
import { Chat } from "../models/chat.model";
import { Message } from "../models/message.model";
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

// PATCH /{oid}
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

    await Post.deleteMany({ userId });

    const chatsToDelete = await Chat.find({
      $or: [{ user1: userId }, { user2: userId }],
    });

    console.log(chatsToDelete);

    for (const chat of chatsToDelete) {
      let otherUserID;

      if (String(chat.user1) === userId) {
        otherUserID = chat.user2;
      } else {
        otherUserID = chat.user1;
      }

      console.log(otherUserID);

      const otherUser = await User.findById(otherUserID);
      console.log(otherUser);

      console.log(otherUser?.chats);

      let otherUserChats = otherUser?.chats ?? [];

      otherUserChats = otherUserChats.filter(
        (chatId) => chatId.toString() !== chat._id.toString()
      );

      await User.findByIdAndUpdate(otherUserID, { chats: otherUserChats });

      await Message.deleteMany({ chatId: chat._id });

      await Chat.findByIdAndDelete(chat._id);
    }

    const result = await User.deleteOne({ _id: user._id });

    return response.status(204).send();
  } catch (e) {
    return response.status(500).json({ error: e });
  }
};

export const blockUser = async (request: Request, response: Response) => {
  const { userId, blockId } = request.body;

  if (!userId || !blockId) {
    return response.status(400).json({ error: CommonErrors.BadRequest });
  }

  try {
    const user = await User.findById(userId);
    const blockUser = await User.findById(blockId);

    if (!user || !blockUser) {
      return response.status(404).json({ error: CommonErrors.NotFound });
    }

    if (userId === blockId) {
      return response.status(400).json({ error: "Cannot block yourself" });
    }

    const isBlocked = user.blockedUsers.includes(blockId);

    await User.updateOne(
      { _id: userId },
      isBlocked
        ? { $pull: { blockedUsers: blockId } }
        : { $addToSet: { blockedUsers: blockId } }
    );

    return response.status(200).json({
      message: isBlocked
        ? "User unblocked successfully"
        : "User blocked successfully",
    });
  } catch (error) {
    console.error("Failed to block user:", error);
    return response.status(500).json({ error: "InternalServerError" });
  }
};

export const reportPost = async (request: Request, response: Response) => {
  const { userId, postId } = request.body;

  if (!userId || !postId) {
    return response.status(400).json({ error: CommonErrors.BadRequest });
  }

  try {
    const user = await User.findById(userId);
    const post = await Post.findById(postId);

    if (!user || !post) {
      return response.status(404).json({ error: CommonErrors.NotFound });
    }

    await User.updateOne(
      { _id: userId },
      { $addToSet: { reportedPosts: postId } }
    );

    await Post.updateOne(
      { _id: postId },
      { $addToSet: { reportedBy: userId } }
    );

    if (post.reportedBy.length >= 5) {
      const creatorId = post.userId;
      const reportedIdList = post.reportedBy;
      await Post.deleteOne({ _id: postId });
      for(const userReportedId of reportedIdList) {
        await User.updateOne(
          { _id: userReportedId },
          { $pull: { reportedPosts: postId } }
        );
      }
      await User.updateOne(
        { _id: creatorId },
        { $pull: { posts: postId } }
      )
    }

    return response.status(200).json({ message: "Post reported successfully" });
  } catch (error) {
    console.error("Failed to block user:", error);
    return response.status(500).json({ error: "InternalServerError" });
  }
}; 