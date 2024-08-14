import React from "react";
import PropTypes from "prop-types";

const Message = ({ text, isSent }) => {
  return (
    <div className={`flex ${isSent ? "justify-end" : "justify-start"} mb-2`}>
      <div
        className={`p-2 max-w-[50%] rounded-lg ${
          isSent ? "bg-blue-300 text-white" : "bg-gray-300 text-black"
        }`}
      >
        <span>{text}</span>
      </div>
    </div>
  );
};

Message.propTypes = {
  text: PropTypes.string.isRequired,
  isSent: PropTypes.bool.isRequired,
};

export default Message;
