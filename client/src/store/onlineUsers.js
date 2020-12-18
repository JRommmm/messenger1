const SET_ONLINE_USERS = "SET_ONLINE_USERS";
const SET_ONLINE_USER = "SET_ONLINE_USER";
const SET_OFFLINE_USER = "SET_OFFLINE_USER";

export const setOnlineUsers = (onlineUsers) => {
  return {
    type: SET_ONLINE_USERS,
    onlineUsers
  };
};

export const setOnlineUser = (id) => {
  return {
    type: SET_ONLINE_USER,
    id
  };
};

export const setOfflineUser = (id) => {
  return {
    type: SET_OFFLINE_USER,
    id
  };
};

const reducer = (state = [], action) => {
  switch (action.type) {
    case SET_ONLINE_USERS: {
      return action.onlineUsers;
    }
    case SET_ONLINE_USER: {
      return [...state, action.id.toString()];
    }
    case SET_OFFLINE_USER: {
      return state.filter((id) => id.toString() !== action.id.toString());
    }
    default:
      return state;
  }
};

export default reducer;
