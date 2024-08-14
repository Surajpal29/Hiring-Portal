import express from "express";
import MessageModel from "../Models/Message.model.js";
import UserInfo from "../Models/userInfo.model.js";
const message = express.Router();

// Send a message

// Example Express route
// Send a message
message.post("/messages", async (req, res) => {
  try {
    const { sender, receiver, text } = req.body;

    if (!sender || !receiver || !text) {
      console.error("Validation error: Missing fields", {
        sender,
        receiver,
        text,
      });
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newMessage = new MessageModel({ sender, receiver, text });
    await newMessage.save();
    res.status(201).json(newMessage); // Return the new message object
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get messages between two users
// Get messages between two users
message.get("/messages", async (req, res) => {
  try {
    const { sender, receiver } = req.query;

    if (!sender || !receiver) {
      return res.status(400).send("Both sender and receiver IDs are required.");
    }

    const messages = await MessageModel.find({
      $or: [
        { sender, receiver },
        { sender: receiver, receiver: sender },
      ],
    }).sort("timestamp");

    res.status(200).json(messages);
  } catch (error) {
    console.error("Error retrieving messages:", error);
    res.status(500).send("Error retrieving messages");
  }
});

// Get all users
message.get("/allusers", async (req, res) => {
  try {
    const userList = await UserInfo.find();
    res.status(200).json({ success: true, userList });
  } catch (error) {
    console.error("Error retrieving users:", error);
    res.status(500).send("Error retrieving users");
  }
});

export { message };
