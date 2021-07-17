export const loadMessages = (data) => {
  return {
    type: "LOAD_MESSAGES",
    data,
  };
};

export const turnOffLoad = () => {
  return {
    type: "IS_PRELOADER",
  };
};

export const turnOffLoadUsers = () => {
  return {
    type: "IS_PRELOADER_USERS",
  };
};

export const isEditUserSwitch = (bool) => {
  return {
    type: "IS_USERS_EDIT",
    bool,
  };
};

export const updateOnlineDate = (data) => {
  return {
    type: "UPDATE_ONLINE_DATE",
    data,
  };
};

export const updateUsersInChat = (data) => {
  return {
    type: "UPDATE_USERS_IN_CHAT",
    data,
  };
};

export const updateMessagesCountInChat = (data) => {
  return {
    type: "UPDATE_MESSAGES_IN_CHAT",
    data,
  };
};

export const editMessage = (id, text) => {
  return {
    type: "UPDATE_MESSAGE",
    id: id,
    text: text,
  };
};

export const showModalWindow = (logicData) => {
  return {
    type: "MODAL_WINDOW_EDIT",
    logicData,
  };
};

export const tempText = (text) => {
  return {
    type: "SAVE_MESSAGE",
    text,
  };
};

export const tempId = (id) => {
  return {
    type: "UPDATE_MESSAGE_ID",
    id,
  };
};

export const initializeUsers = (newUsers) => {
  return {
    type: "INIT_USERS",
    newUsers,
  };
};

export const isUserExist = (status) => {
  return {
    type: "USER_VALID",
    status,
  };
};

export const userEdit = (isEdit) => {
  return {
    type: "SET_USER_EDIT",
    isEdit,
  };
};

export const currentEditUs = (user) => {
  return {
    type: "USER_ON_EDIT",
    user,
  };
};
