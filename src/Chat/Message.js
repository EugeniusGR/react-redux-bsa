import "./Message.css";
import React, { useState } from "react";

function Message(props) {
  const [isLiked, setIsLiked] = useState(false);

  const liked = () => {
    if (isLiked === false) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
  };

  const renderTime = (createdAt) => {
    const date = new Date(createdAt);
    return (
      date.getHours().toString().padStart(2, "0") +
      ":" +
      date.getMinutes().toString().padStart(2, "0")
    );
  };

  let date = renderTime(props.data.createdAt);

  return (
    <div className="message">
      <img
        className="message-user-avatar"
        src={props.data.avatar}
        alt="avatar"
      />
      <div className="message-body">
        <div className="message-body_text">
          <div className="message-user-name">{props.data.user}</div>
          <span className="message-text">{props.data.text}</span>
        </div>
        <span className="message-time">{date}</span>
      </div>
      <button
        className={isLiked ? "message-liked" : "message-like"}
        onClick={liked}
      ></button>
    </div>
  );
}

export default Message;
