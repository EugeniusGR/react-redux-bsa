import React, { useState } from "react";

import "./ModalWindow.css";

import { connect } from "react-redux";
import { showModalWindow, tempText, tempId } from "../actions/";

function ModalWindow(props) {
  const [text, setText] = useState("");

  const sendChanges = () => {
    if (text === undefined || text === "") {
      props.showModalWindow(false);
    } else {
      props.tempText(text);
      props.showModalWindow(false);

      const dateEdit = new Date();
      props.edit(text, props.reducer.tempIdValue, dateEdit);
    }
  };

  const readText = (e) => {
    props.reducer.tempEditedText = e.target.value;
    setText(props.reducer.tempEditedText);
  };

  return (
    <div
      className={
        props.reducer.editModal
          ? "edit-message-modal modal-shown"
          : "edit-message-modal"
      }
    >
      <div className="block-modal">
        <h1>Enter new text:</h1>
        <div className="line"></div>
        <input
          type="text"
          className="edit-message-input"
          onChange={readText}
          value={props.reducer.tempEditedText}
        />
        <div className="buttonsField">
          <button
            className="buttonStyle edit-message-close"
            onClick={() => props.showModalWindow(false)}
          >
            Cancel
          </button>
          <button
            className="buttonStyle edit-message-button"
            onClick={() => sendChanges()}
          >
            Edit
          </button>
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps())(ModalWindow);
