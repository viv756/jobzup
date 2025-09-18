import mongoose from "mongoose";

import ConversationModel from "../models/conversation.model";

export const getUsersForSidebarService = async (userId: string) => {

  const sidebarUsers = await ConversationModel.aggregate([
    {
      $match: { "participants.userId": new mongoose.Types.ObjectId(userId) },
    },
    { $unwind: "$participants" },
    {
      $match: {
        "participants.userId": { $ne: new mongoose.Types.ObjectId(userId) },
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "participants.userId",
        foreignField: "_id",
        as: "user",
      },
    },

    { $unwind: "$user" },
    {
      $project: {
        _id: 0,
        conversationId: "$_id",
        userId: "$user._id",
        fullName: "$user.fullName",
        profilePic: "$user.profilePic",
        lastMessage: "$lastMessage",
      },
    },
  ]);

  return { sidebarUsers };
};
