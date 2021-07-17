import React from "react";
import "./Header.css";

function Header(props) {
  return (
    <div className="header">
      <span className="header-title">Ozark Family</span>
      <span>|</span>
      <span className="header-users-count-title">Users in chat:</span>
      <span className="header-users-count">{props.userInChat}</span>
      <span>|</span>
      <span className="header-messages-count-title">Messages:</span>
      <span className="header-messages-count">{props.messages}</span>
      <span>|</span>
      <span className="header-last-message-date-title">Last Message:</span>
      <span className="header-last-message-date">{props.lastMessage}</span>
    </div>
  );
}

export default Header;
