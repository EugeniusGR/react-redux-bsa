import React, { useEffect } from "react";
import MessageList from "./MessageList";
import Preloader from "./Preloader";
import MessageInput from "./MessageInput";
import Header from "./Header";
import ModalWindow from "./ModalWindow";
import { v4 as uuidv4 } from "uuid";

import { useSelector, useDispatch } from "react-redux";
import {
  loadMessages,
  turnOffLoad,
  updateOnlineDate,
  updateUsersInChat,
  updateMessagesCountInChat,
  showModalWindow,
  tempId,
} from "../actions/";

function Chat(props) {
  const dispatch = useDispatch();

  const preloader = useSelector((state) => state.chat.preloader);
  const editModal = useSelector((state) => state.chat.editModal);
  const messages = useSelector((state) => state.chat.messages);
  const messageNumber = useSelector((state) => state.chat.messageNumber);
  const usersInChat = useSelector((state) => state.chat.usersInChat);
  const lastMessageSent = useSelector((state) => state.chat.lastMessageSent);

  const renderTime = (createdAt) => {
    const date = new Date(createdAt);

    return (
      date.getDate().toString().padStart(2, "0") +
      "." +
      (date.getMonth() + 1).toString().padStart(2, "0") +
      "." +
      date.getFullYear().toString().padStart(4, "0") +
      " " +
      date.getHours().toString().padStart(2, "0") +
      ":" +
      date.getMinutes().toString().padStart(2, "0")
    );
  };

  const usersCount = (array) => {
    let isThere = [];
    let numOfUsers = 0;
    array.forEach((val) => {
      if (!isThere.includes(val.user)) {
        isThere.push(val.user);
        numOfUsers++;
      }
    });
    return numOfUsers;
  };

  useEffect(async () => {
    const url = props.url;
    const res = await fetch(url);
    const messagesData = await res.json();

    if (messagesData.length === 0) {
      return 0;
    }

    const usersInChatCount = usersCount(messagesData);

    const TodayDate = renderTime(
      messagesData[messagesData.length - 1].createdAt
    );

    dispatch(turnOffLoad(messagesData));
    dispatch(loadMessages(messagesData));
    dispatch(updateMessagesCountInChat(messagesData.length));
    dispatch(updateUsersInChat(usersInChatCount));
    dispatch(updateOnlineDate(TodayDate));

    window.addEventListener("keydown", (event) => {
      if (event.keyCode === 38) {
        arrowUpHandler();
      }
    });
  }, []);

  const arrowUpHandler = () => {
    const currentMessages = [...messages];

    let isOwn = currentMessages.some((element) => {
      return element.user === "Admin";
    });

    if (!isOwn) {
      return false;
    }

    let lastMessageId;
    const lengthMessages = currentMessages.length - 1;
    for (let i = lengthMessages; i >= 0; i--) {
      if (currentMessages[i].user === "Admin") {
        lastMessageId = currentMessages[i].id;
        break;
      }
    }
    dispatch(showModalWindow(true));
    dispatch(tempId(lastMessageId));
  };

  const addMessage = async (myText, clear) => {
    const OldMessage = [...messages];
    let OldMessageCount = messageNumber;
    OldMessageCount++;
    const currentDate = new Date();
    const newMessage = {
      user: '"Admin"',
      createdAt: currentDate,
      id: uuidv4(),
      fromSender: true,
      text: myText,
    };

    try {
      await fetch("http://localhost:3030/api/new-message", {
        method: "POST",
        body: JSON.stringify(newMessage),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }).then((response) => response.json());
    } catch {}

    OldMessage.push(newMessage);

    dispatch(loadMessages(OldMessage));
    dispatch(updateOnlineDate(renderTime(currentDate)));
    dispatch(updateMessagesCountInChat(OldMessageCount));

    const usersInChatCount = usersCount(OldMessage);
    dispatch(updateUsersInChat(usersInChatCount));

    clear();
  };

  const editMessageFunc = async (newText, id, date) => {
    const OldMessage = [...messages];
    let indexForEdited = OldMessage.findIndex((message) => {
      return message.id === id;
    });

    try {
      await fetch(`http://localhost:3030/api/edit-message/${id}`, {
        method: "PUT",
        body: JSON.stringify({ newText }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }).then((response) => response.json());
    } catch {}

    OldMessage[indexForEdited].text = newText;
    OldMessage[indexForEdited].createdAt = date;
    dispatch(loadMessages(OldMessage));
  };

  const deleteMessage = async (id) => {
    let OldMessage = [...messages];
    let OldMessageCount = messageNumber;
    OldMessageCount--;
    OldMessage = OldMessage.filter((val) => {
      if (val.id !== id) {
        return val;
      }
    });

    try {
      await fetch(`http://localhost:3030/api/delete-message/${id}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }).then((response) => response.json());
    } catch {}

    const usersInChatCount = usersCount(OldMessage);
    dispatch(loadMessages(OldMessage));
    dispatch(updateMessagesCountInChat(OldMessageCount));
    dispatch(updateUsersInChat(usersInChatCount));
  };

  if (!preloader) {
    return (
      <div className="chat">
        {editModal ? (
          <ModalWindow edit={editMessageFunc} />
        ) : (
          <div>
            <Header
              messages={messageNumber}
              userInChat={usersInChat}
              lastMessage={lastMessageSent}
            />
            <MessageList
              messages={messages}
              edit={editMessageFunc}
              delete={deleteMessage}
            />
            <MessageInput renderMessage={addMessage} />
          </div>
        )}
      </div>
    );
  } else {
    return <Preloader />;
  }
}

export default Chat;
