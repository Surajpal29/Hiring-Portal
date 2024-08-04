import React, { useEffect, useState } from "react";
import axios from "axios";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import Webcam from "react-webcam";
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
          "http://localhost:8000/userchats/allusers"
        );
        // Check if the response data is an array
        console.log(response.data.userList);

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
      if (!currentUser || !chatUser) return; // Ensure currentUser and chatUser are defined

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

  console.log(chatUser);
  // console.log(chatuserlist.success);

  return (
    <div className={``}>
      {/* upper div */}
      <div className={`pt-10 px-20 relative ${showProfile ? "blur-sm" : ""}`}>
        <div className="flex gap-3">
          {/* upper left div */}
          <div className="w-[30vw] h-[10v] p-5 border-2 border-black flex gap-3 rounded-lg items-center justify-evenly">
            <span className="w-fit h-fit p-2 border border-black rounded-full">
              <Link to="/">
                <HomeIcon className="" />
              </Link>
            </span>
            <h3 className="font-bold text-3xl">Chats</h3>
            <input
              type="search"
              name=""
              id=""
              placeholder="search"
              className="w-[50%] border border-zinc-800 rounded-3xl px-3 py-1 text-xl"
            />
            <span className="w-fit h-fit p-2 rounded-full bg-red-500">
              <AddIcon />
            </span>
          </div>
          {/* upper right div */}
          <div className="w-[60vw] h-[10v] p-5 border-2 border-black flex gap-3 rounded-lg items-center justify-between px-10">
            <div className="flex items-center justify-center gap-5">
              <div className="w-14 h-14 border border-black  rounded-full bg-blue-400 flex items-center justify-center">
                {chatUser && chatUser.profilepic ? (
                  <img
                    src={chatUser.profilepic}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <h5 className="text-3xl ">
                    {chatUser && chatUser.firstName[0]}
                  </h5>
                )}
              </div>
              <span>
                <h4 className="capitalize font-semibold text-lg">
                  {chatUser && chatUser.firstName + " " + chatUser.lastName}
                </h4>
              </span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <button
                onClick={() => setShowProfile(!showProfile)}
                className="w-20 h-10 rounded-3xl border text-black cursor-pointer"
              >
                Profile
              </button>
              <button className="w-20 h-10 rounded-3xl border text-black cursor-pointer">
                <CallIcon />
              </button>
              <button className="w-20 h-10 rounded-3xl border text-black cursor-pointer">
                <VideoCallIcon />
              </button>
            </div>
          </div>
        </div>
        {/* lower div */}
        <div className="flex gap-3 mt-3">
          {/* lower left div */}
          <div className="w-[30vw] h-[77vh] p-5 border-2 border-black  gap-3 rounded-lg overflow-y-auto no-scrollbar ">
            {Array.isArray(chatuserlist) &&
              chatuserlist.map((item, index) => (
                <button
                  key={index}
                  onClick={() => selectedUserForChat(item)}
                  className="w-full"
                >
                  <div>
                    <div className="flex gap-3  items-center justify-between">
                      <div className="flex gap-3">
                        <span className="w-12 h-12 border border-black rounded-full bg-blue-400 flex items-center justify-center">
                          {chatUser && chatUser.profilepic ? (
                            <img
                              src={chatUser.profilepic}
                              alt="Profile"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <h5 className="text-3xl ">
                              {chatUser && chatUser.firstName[0]}
                            </h5>
                          )}
                        </span>
                        <div>
                          <h3 className="capitalize font-semibold text-lg">
                            {item.firstName + " " + item.lastName}
                          </h3>
                          <p className="text-gray-700">message..........</p>
                        </div>
                      </div>
                      <div className="flex-col items-center justify-end">
                        <h6 className="">13:56 pm</h6>
                        <span className="w-4 h-4 p-1 rounded-full flex items-center justify-center border bg-red-500">
                          1
                        </span>
                      </div>
                    </div>
                    <hr className="w-[100%] h-[5%] bg-black rounded-full my-2" />
                  </div>
                </button>
              ))}
          </div>
          {/* lower right div */}
          <div
            className={`w-[60vw]  p-5  rounded-lg  border-2 relative border-black  px-1 ${
              chatUser ? "" : "blur-sm"
            }`}
          >
            <div className="max-h-[70vh] overflow-y-auto mb-20">
              {messages.map((msg, index) => (
                <Message
                  key={index}
                  text={msg.text}
                  isSent={msg.sender === currentUser}
                />
              ))}
            </div>
            <div className="w-[100%] h-[10%] flex items-center justify-around absolute bottom-2   rounded-lg">
              <div className=" w-[82%] h-full flex items-center justify-between border border-black rounded-lg relative">
                <span className="flex  w-full text-xl gap-3 px-3 items-center justify-center">
                  <EmojiEmotionsIcon
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  />
                  {showEmojiPicker && (
                    <div className="absolute bottom-full left-0">
                      <Picker data={data} onEmojiSelect={handleEmojiSelect} />
                    </div>
                  )}
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="write message"
                    className=" text-input text-nowrap w-[90%] "
                  />
                  <span
                    className="cursor-pointer"
                    onClick={() => toggleCamera()}
                  >
                    <CameraIcon />
                  </span>
                  {showCamera && (
                    <div className="absolute bottom-full left-0">
                      <CameraComponent
                        onClose={handleCloseCamera}
                        onCapture={handleCapture}
                      />
                    </div>
                  )}
                  {capturedImage && (
                    <div className="absolute bottom-14 shadow-slate-500xl rounded-3xl overflow-hidden">
                      {/* <h2>Preview:</h2> */}
                      <img
                        className="relative"
                        src={capturedImage}
                        alt="captured"
                      />
                      <button
                        className="absolute top-0 right-2 font-extrabold text-white"
                        onClick={handleDeletePhoto}
                      >
                        <DeleteIcon />
                      </button>
                    </div>
                  )}
                </span>
              </div>
              <span className="border w-[7%] h-full rounded-full flex items-center justify-center border-black">
                <MicIcon />
              </span>
              <span className="border w-[7%] h-full rounded-full flex items-center justify-center border-black">
                <Send onClick={handleSendMessage} />
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* profile div */}
      {showProfile && (
        <SeeChatUserProfile
          onData={() => setShowProfile(!showProfile)}
          person={chatUser}
        />
      )}
    </div>
  );
};

export default ChatsPage;
