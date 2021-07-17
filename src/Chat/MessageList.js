import React from "react";
import Message from "./Message";
import "./MessageList.css";
import OwnMessage from "./OwnMessage";

function MessageList(props) {
  const validDate = (dateParsed) => {
    return (
      dateParsed.getFullYear() + dateParsed.getDate() + dateParsed.getMonth()
    );
  };

  const renderTime = (createdAt) => {
    const date = new Date(createdAt);
    const currentDate = new Date();
    let day = date.getDay();

    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    day = days[day];

    const month = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const indexForMonth = date.getMonth();
    const monthMessage = month[indexForMonth];

    const validDate = date.getDate() + date.getFullYear() + date.getMonth();
    const validDateYesterday =
      date.getDate() + 1 + date.getFullYear() + date.getMonth();
    const validCurrentDay =
      currentDate.getDate() +
      currentDate.getFullYear() +
      currentDate.getMonth();

    if (validDate === validCurrentDay) {
      return "Today";
    }

    if (validDateYesterday === validCurrentDay) {
      return "Yesterday";
    }

    return day + ", " + date.getDate() + " " + monthMessage;
  };

  let currentDateChecker = 0;

  return (
    <div className="message-list">
      {props.messages.map((value, index) => {
        let dateParsed = new Date(value.createdAt);
        let dateToCheck = validDate(dateParsed);
        let DateToSHow = renderTime(dateParsed);
        if (currentDateChecker !== dateToCheck) {
          currentDateChecker = dateToCheck;
          return (
            <div key={index + "line"}>
              <div className="messages-divider">{DateToSHow}</div>
              <div key={index + "own"}>
                {value.fromSender ? (
                  <OwnMessage
                    data={value}
                    key={index}
                    edit={props.edit}
                    delete={props.delete}
                  />
                ) : (
                  <Message data={value} key={index + "def"} />
                )}
              </div>
            </div>
          );
        }
        return value.fromSender ? (
          <OwnMessage
            data={value}
            key={index + "own"}
            edit={props.edit}
            delete={props.delete}
          />
        ) : (
          <Message data={value} key={index + "def"} />
        );
      })}
    </div>
  );
}

export default MessageList;
