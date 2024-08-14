import React, { useEffect, useState } from "react";
import axios from "axios";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import CameraComponent from "./CameraComponent";
import Message from "./MessageBubble";
import SeeChatUserProfile from "./SeeChatUserProfile";
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
import { useMediaQuery } from "react-responsive";

const ChatsPage = () => {
  const userData = useSelector((state) => state.userData);
  const [chatUserList, setChatUserList] = useState([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [showCamera, setShowCamera] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [chatUser, setChatUser] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
  const [showChat, setShowChat] = useState(false);

  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const isTablet = useMediaQuery({
    query: "(min-width: 769px) and (max-width: 1024px)",
  });
  const isDesktop = useMediaQuery({ query: "(min-width: 1025px)" });

  const currentUser =
    userData[1] && userData[1].userinfodata ? userData[1].userinfodata._id : "";

  useEffect(() => {
    const fetchUserList = async () => {
      try {
        const response = await axios.get(
          "hiring-portal-virid.vercel.app/userchats/allusers"
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
          "hiring-portal-virid.vercel.app/userchats/messages",
          {
            params: {
              sender: currentUser,
              receiver: chatUser._id,
            },
          }
        );
        const messages = response.data || [];
        setMessages(messages);
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
        receiver: chatUser._id,
        text: message,
      };
      try {
        const response = await axios.post(
          "https://hiring-portal-virid.vercel.app/userchats/messages",
          newMessage
        );
        setMessages([...messages, response.data]); // Add the new message to the state
        setMessage("");
      } catch (error) {
        console.error("Error sending message", error);
        alert("Failed to send message. Please try again.");
      }
    }
  };

  const selectedUserForChat = (item) => {
    setChatUser(item);
    setShowChat(true);
  };

  return (
    <div
      className={`flex min-h-screen ${
        isMobile || isTablet ? "flex-col" : "flex-row"
      } bg-gray-200`}
    >
      {/* Left section */}
      {!showChat && (
        <div
          className={`w-full ${isDesktop ? "lg:w-[25%] md:w-[35%]" : ""} ${
            showProfile ? "blur-sm" : ""
          }`}
        >
          {/* Upper left div */}
          <div className="w-full p-4 border-2 border-gray-300 bg-white rounded-lg shadow-md flex gap-1 items-center">
            <div className="flex w-full gap-2">
              <button className="flex-col">
                <Link
                  to="/"
                  className="flex items-center justify-center p-2 border border-gray-300 rounded-full bg-blue-500 text-white"
                >
                  <HomeIcon />
                </Link>
              </button>
              <div className="w-[100%] flex-col items-center justify-center">
                <input
                  type="search"
                  placeholder="Search"
                  className="w-[80%] mr-2 border border-gray-300 rounded-3xl px-3 py-2 text-base md:text-lg"
                />
                <button className="md:w-[15%] p-2 rounded-full bg-red-500 text-white shadow-md">
                  <AddIcon />
                </button>
              </div>
            </div>
          </div>
          {/* Lower left div */}
          <div className="w-full h-[87%] p-4 border-2 border-gray-300 bg-white rounded-lg shadow-md overflow-y-auto">
            {Array.isArray(chatUserList) &&
              chatUserList.map((item, index) => (
                <button
                  key={index}
                  onClick={() => selectedUserForChat(item)}
                  className="w-full flex lg:items-center gap-3 p-2 border-b border-gray-300 hover:bg-gray-100 transition duration-200"
                >
                  <div className="flex w-full">
                    <div className="lg:w-12 lg:h-12 max-w-12 max-h-12 border border-gray-300 rounded-full bg-blue-400 hidden md:flex items-center justify-center">
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
                    <div className="flex-col mx-2">
                      <h3 className="font-semibold text-lg text-gray-700">
                        {`${item.firstName} ${item.lastName}`}
                      </h3>
                      <p className="text-gray-500">Message...</p>
                    </div>
                  </div>
                  <div className="hidden lg:flex flex-col items-end">
                    <span className="text-xs text-gray-500">13:56 PM</span>
                    <span className="lg:w-4 lg:h-4 w-fit h-fit p-1 rounded-full bg-red-500 text-white flex items-center justify-center">
                      1
                    </span>
                  </div>
                </button>
              ))}
          </div>
        </div>
      )}

      {/* Right section */}
      {showChat && (
        <div
          className={`w-full ${isDesktop ? "lg:w-[100%]" : "flex-1"} ${
            isMobile ? "h-screen" : ""
          }`}
        >
          {/* Upper right div */}
          <div className="w-full lg:p-4 border-2 border-gray-300 bg-white rounded-lg shadow-md flex flex-col md:flex-row gap-3 items-center justify-between">
            <div className="grid grid-cols-4 lg:flex lg:items-center lg:justify-between w-full lg:gap-3">
              <div className="lg:w-12 lg:h-12 border border-gray-300 rounded-full bg-blue-400 flex items-center justify-center">
                {chatUser && chatUser.profilepic ? (
                  <img
                    src={chatUser.profilepic}
                    alt="Profile"
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <span className="text-3xl text-white">
                    {chatUser && chatUser.firstName
                      ? chatUser.firstName[0]
                      : "U"}
                  </span>
                )}
              </div>
              <div className="flex flex-col ml-2">
                <h3 className="font-semibold text-lg text-gray-700">
                  {chatUser && `${chatUser.firstName} ${chatUser.lastName}`}
                </h3>
                <p className="text-gray-500">Online</p>
              </div>
              <div className="flex gap-2 items-center justify-end col-span-2 md:col-span-1">
                <button
                  onClick={() => setShowProfile(!showProfile)}
                  className="p-2 rounded-full bg-blue-500 text-white"
                >
                  <AddIcon />
                </button>
                <button className="p-2 rounded-full bg-green-500 text-white">
                  <CallIcon />
                </button>
                <button className="p-2 rounded-full bg-red-500 text-white">
                  <VideoCallIcon />
                </button>
              </div>
            </div>
          </div>

          {/* Chat messages */}
          {Array.isArray(messages) &&
            messages.map((msg, index) => (
              <Message
                key={index}
                text={msg?.text || "start msg"}
                isSent={msg?.sender === currentUser}
              />
            ))}

          {/* Chat input */}
          <div className="w-full p-4 border-t-2 border-gray-300 bg-white flex items-center">
            <button
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              className="p-2 rounded-full bg-gray-200"
            >
              <EmojiEmotionsIcon />
            </button>
            {showEmojiPicker && (
              <Picker
                data={data}
                onEmojiSelect={handleEmojiSelect}
                style={{ position: "absolute", bottom: "60px", left: "20px" }}
              />
            )}
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message"
              className="w-full ml-2 border border-gray-300 rounded-lg px-3 py-2"
            />
            <button
              onClick={handleSendMessage}
              className="ml-2 p-2 rounded-full bg-blue-500 text-white"
            >
              <Send />
            </button>
            <button
              onClick={toggleCamera}
              className="ml-2 p-2 rounded-full bg-blue-500 text-white"
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
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <button
                  onClick={handleDeletePhoto}
                  className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full"
                >
                  <DeleteIcon />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* User profile */}
      {showProfile && chatUser && (
        <SeeChatUserProfile
          person={chatUser}
          onData={(data) => setShowProfile(data)}
        />
      )}
    </div>
  );
};

export default ChatsPage;
