import React, { useState } from "react";
import "./MessageInput.css";

function MessageInput(props) {
  const [message, setMessage] = useState("");

  const clear = () => {
    setMessage("");
  };

  const handleClick = () => {
    const clearFunc = clear;
    if (!(message === undefined || message === "")) {
      props.renderMessage(message, clearFunc);
    }
  };

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  return (
    <div className="message-input">
      <input
        className="message-input-text"
        type="text"
        value={message}
        onChange={handleChange}
      />
      <button className="message-input-button" onClick={handleClick}>
        Send
      </button>
    </div>
  );
}

export default MessageInput;
