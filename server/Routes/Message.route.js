import express from "express";
import Message from "../Models/Message.model.js";
import UserInfo from "../Models/userInfo.model.js";
const message = express.Router();

// Send a message
message.post("/messages", async (req, res) => {
  try {
    const { sender, receiver, text } = req.body;
    const newMessage = new Message({ sender, receiver, text });
    await newMessage.save();
    res.status(201).send("Message sent");
  } catch (error) {
    res.status(500).send("Error sending message");
  }
});

// Get messages between two users
message.get("/messages", async (req, res) => {
  try {
    const { sender, receiver } = req.query;
    const messages = await Message.find({
      $or: [
        { sender, receiver },
        { sender: receiver, receiver: sender },
      ],
    }).sort("timestamp");
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).send("Error retrieving messages");
  }
});

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
