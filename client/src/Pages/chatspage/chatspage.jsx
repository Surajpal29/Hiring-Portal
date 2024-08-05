import React, { useEffect, useState } from "react";
import axios from "axios";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import CameraComponent from "./CameraComponent";
import Message from "./MessageBubble";
import SeeChatUserProfile from "./SeeChatUserProfile";

// icons
import AddIcon from "@mui/icons-material/Add";
import CallIcon from "@mui/icons-material/Call";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import HomeIcon from "@mui/icons-material/Home";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import CameraIcon from "@mui/icons-material/PhotoCamera";
import MicIcon from "@mui/icons-material/Mic";
import Send from "@mui/icons-material/Send";
import DeleteIcon from "@mui/icons-material/Close";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ChatsPage = () => {
  const userData = useSelector((state) => state.userData);
  const [chatuserlist, setChatUserList] = useState([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [showCamera, setShowCamera] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [chatUser, setChatUser] = useState();
  const [showProfile, setShowProfile] = useState(false);

  const currentUser =
    userData[1] && userData[1].userinfodata
      ? `${userData[1].userinfodata.firstName} ${userData[1].userinfodata.lastName}`
      : "";

  useEffect(() => {
    const fetchUserList = async () => {
      try {
        const response = await axios.get(
          "https://hiring-portal-virid.vercel.app/userchats/allusers"
        );
        if (Array.isArray(response.data.userList)) {
          setChatUserList(response.data.userList);
        } else {
          console.error("Expected an array but received:", response.data);
        }
      } catch (error) {
        console.error("Error fetching user list", error);
      }
    };
    fetchUserList();
  }, []);

  useEffect(() => {
    const fetchMessages = async () => {
      if (!currentUser || !chatUser) return;

      try {
        const response = await axios.get(
          "http://localhost:8000/userchats/messages",
          {
            params: {
              sender: currentUser,
              receiver: chatUser,
            },
          }
        );
        setMessages(response.data);
      } catch (error) {
        console.error("Error fetching messages", error);
      }
    };
    fetchMessages();
  }, [currentUser, chatUser]);

  const handleEmojiSelect = (emoji) => {
    setMessage(message + emoji.native);
    setShowEmojiPicker(false);
  };

  const toggleCamera = () => {
    setShowCamera(!showCamera);
  };

  const handleCapture = (imageSrc) => {
    setCapturedImage(imageSrc);
  };

  const handleCloseCamera = () => {
    setShowCamera(false);
  };

  const handleDeletePhoto = () => {
    setCapturedImage(null);
  };

  const handleSendMessage = async () => {
    if (message.trim()) {
      const newMessage = {
        sender: currentUser,
        receiver: chatUser,
        text: message,
      };
      try {
        await axios.post(
          "http://localhost:8000/userchats/messages",
          newMessage
        );
        setMessages([...messages, newMessage]);
        setMessage("");
      } catch (error) {
        console.error("Error sending message", error);
      }
    }
  };

  const selectedUserForChat = (item) => {
    setChatUser(item);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Upper section */}
      <div
        className={`flex flex-col md:flex-row gap-3 p-4 md:p-6 lg:p-8 relative ${
          showProfile ? "blur-sm" : ""
        }`}
      >
        {/* Upper left div */}
        <div className="w-full md:w-1/3 p-4 border-2 border-gray-300 bg-white rounded-lg shadow-md flex gap-3 items-center">
          <Link
            to="/"
            className="flex items-center justify-center p-2 border border-gray-300 rounded-full bg-blue-500 text-white"
          >
            <HomeIcon />
          </Link>
          <h3 className="font-bold text-xl md:text-2xl text-gray-700">Chats</h3>
          <input
            type="search"
            placeholder="Search"
            className="w-full border border-gray-300 rounded-3xl px-3 py-1 text-base md:text-lg"
          />
          <button className="p-2 rounded-full bg-red-500 text-white shadow-md">
            <AddIcon />
          </button>
        </div>

        {/* Upper right div */}
        <div className="w-full md:w-2/3 p-4 border-2 border-gray-300 bg-white rounded-lg shadow-md flex flex-col md:flex-row gap-3 items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 border border-gray-300 rounded-full bg-blue-400 flex items-center justify-center">
              {chatUser && chatUser.profilepic ? (
                <img
                  src={chatUser.profilepic}
                  alt="Profile"
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <span className="text-3xl text-white">
                  {chatUser && chatUser.firstName[0]}
                </span>
              )}
            </div>
            <span>
              <h4 className="font-semibold text-lg text-gray-700">
                {chatUser && `${chatUser.firstName} ${chatUser.lastName}`}
              </h4>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="w-20 h-10 rounded-full border border-gray-300 text-gray-700 bg-gray-200 hover:bg-gray-300"
            >
              Profile
            </button>
            <button className="w-10 h-10 rounded-full border border-gray-300 text-gray-700 bg-gray-200 hover:bg-gray-300">
              <CallIcon />
            </button>
            <button className="w-10 h-10 rounded-full border border-gray-300 text-gray-700 bg-gray-200 hover:bg-gray-300">
              <VideoCallIcon />
            </button>
          </div>
        </div>
      </div>

      {/* Lower section */}
      <div className="flex flex-col md:flex-row gap-3 p-4 md:p-6 lg:p-8">
        {/* Lower left div */}
        <div className="w-full md:w-1/3 p-4 border-2 border-gray-300 bg-white rounded-lg shadow-md overflow-y-auto max-h-[70vh]">
          {Array.isArray(chatuserlist) &&
            chatuserlist.map((item, index) => (
              <button
                key={index}
                onClick={() => selectedUserForChat(item)}
                className="w-full flex items-center gap-3 p-2 border-b border-gray-300 hover:bg-gray-100 transition duration-200"
              >
                <div className="w-12 h-12 border border-gray-300 rounded-full bg-blue-400 flex items-center justify-center">
                  {item.profilepic ? (
                    <img
                      src={item.profilepic}
                      alt="Profile"
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    <span className="text-3xl text-white">
                      {item.firstName[0]}
                    </span>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-gray-700">
                    {`${item.firstName} ${item.lastName}`}
                  </h3>
                  <p className="text-gray-500">Message...</p>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-xs text-gray-500">13:56 PM</span>
                  <span className="w-4 h-4 p-1 rounded-full bg-red-500 text-white flex items-center justify-center">
                    1
                  </span>
                </div>
              </button>
            ))}
        </div>

        {/* Lower right div */}
        <div
          className={`w-full md:w-2/3 p-4 border-2 border-gray-300 bg-white rounded-lg shadow-md relative ${
            chatUser ? "" : "blur-sm"
          }`}
        >
          <div className="max-h-[70vh] overflow-y-auto mb-20">
            {messages.map((msg, index) => (
              <Message
                key={index}
                text={msg.text}
                isSentByCurrentUser={msg.sender === currentUser}
              />
            ))}
          </div>

          <div
            className={`flex items-center gap-3 border-t border-gray-300 pt-2 ${
              showCamera ? "blur-sm" : ""
            }`}
          >
            <button
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300"
            >
              <EmojiEmotionsIcon />
            </button>
            {showEmojiPicker && (
              <div className="absolute bottom-16 left-4">
                <Picker data={data} onEmojiSelect={handleEmojiSelect} />
              </div>
            )}
            <input
              type="text"
              placeholder="Type a message"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button
              onClick={toggleCamera}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300"
            >
              <CameraIcon />
            </button>
            {showCamera && (
              <CameraComponent
                onCapture={handleCapture}
                onClose={handleCloseCamera}
              />
            )}
            {capturedImage && (
              <div className="relative">
                <img
                  src={capturedImage}
                  alt="Captured"
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <button
                  onClick={handleDeletePhoto}
                  className="absolute top-0 right-0 w-6 h-6 flex items-center justify-center rounded-full bg-red-500 text-white"
                >
                  <DeleteIcon />
                </button>
              </div>
            )}
            <button
              onClick={handleSendMessage}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-500 text-white hover:bg-blue-600"
            >
              <Send />
            </button>
          </div>
        </div>
      </div>

      {showProfile && (
        <SeeChatUserProfile
          user={chatUser}
          onClose={() => setShowProfile(false)}
        />
      )}
    </div>
  );
};

export default ChatsPage;
