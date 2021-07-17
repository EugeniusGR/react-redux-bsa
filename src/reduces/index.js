import { combineReducers } from "redux";

const stateForStart = {
  preloader: true,
  preloaderUsers: true,
  messages: [],
  messageNumber: 0,
  usersInChat: 0,
  lastMessageSent: 0,
  editModal: false,
  tempEditedText: "",
  tempIdValue: false,
  statusUser: "/",
  users: [],
  userOnEdit: false,
  isEditUser: false,
  currentEditedUser: "",
};

const chat = (state = stateForStart, action) => {
  switch (action.type) {
    case "LOAD_MESSAGES":
      return { ...state, messages: action.data };
    case "IS_PRELOADER":
      return { ...state, preloader: false };
    case "IS_PRELOADER_users":
      return { ...state, preloaderUsers: false };
    case "UPDATE_ONLINE_DATE":
      return { ...state, lastMessageSent: action.data };
    case "UPDATE_USERS_IN_CHAT":
      return { ...state, usersInChat: action.data };
    case "UPDATE_MESSAGES_IN_CHAT":
      return { ...state, messageNumber: action.data };
    case "SAVE_MESSAGE":
      return { ...state, tempEditedText: action.text };
    case "UPDATE_MESSAGE_ID":
      return { ...state, tempIdValue: action.id };
    case "MODAL_WINDOW_EDIT":
      return { ...state, editModal: action.logicData };
    case "USER_VALID":
      return { ...state, statusUser: action.status };
    case "INIT_USERS":
      return { ...state, users: action.newUsers };
    case "SET_USER_EDIT":
      return { ...state, userOnEdit: action.isEdit };
    case "IS_USERS_EDIT":
      return { ...state, isEditUser: action.bool };
    case "USER_ON_EDIT":
      return { ...state, currentEditedUser: action.user };
    default:
      return state;
  }
};

const rootReducer = combineReducers({ chat });

export default rootReducer;
