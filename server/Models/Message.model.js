import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserInfos",
    required: true,
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserInfos",
    required: true,
  },
  text: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const MessageModel = mongoose.model("Message", messageSchema);
export default MessageModel;
