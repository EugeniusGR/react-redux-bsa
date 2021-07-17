import React from "react";
import "./OwnMessage.css";

import { connect } from "react-redux";
import { showModalWindow, tempText, tempId } from "../actions/";

function OwnMessage(props) {
  const renderTime = (createdAt) => {
    const date = new Date(createdAt);
    return (
      date.getHours().toString().padStart(2, "0") +
      ":" +
      date.getMinutes().toString().padStart(2, "0")
    );
  };

  const editMes = () => {
    props.tempId(props.data.id);
    props.tempText(props.data.text);
  };

  const showModal = () => {
    props.showModalWindow(true);
    editMes();
  };

  const deleteMes = () => {
    const id = props.data.id;
    props.delete(id);
  };

  let date = renderTime(props.data.createdAt);

  return (
    <div className="own-message">
      <button className="message-edit" onClick={showModal}>
        🖊️
      </button>
      <button className="message-delete" onClick={deleteMes}>
        🗑️
      </button>
      <div className="message-body">
        <div className="message-body_text-own">
          <span className="message-text">{props.data.text}</span>
        </div>
        <span className="message-time">{date}</span>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return { reducer: state.chat };
};

const mapDispatchToProps = () => {
  return {
    showModalWindow,
    tempText,
    tempId,
  };
};

export default connect(mapStateToProps, mapDispatchToProps())(OwnMessage);
