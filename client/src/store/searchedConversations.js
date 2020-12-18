import axios from "axios";
import store from "../store/index";

const SEARCH = "SEARCH";
const REMOVE = "REMOVE";

export const search = (users, currentConvos, onlineUsers) => {
  return {
    type: SEARCH,
    payload: { users, currentConvos, onlineUsers }
  };
};

export const remove = (userId) => {
  return {
    type: REMOVE,
    userId
  };
};

export const searchUsers = (username) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/users/${username}`);
    const currentConvos = store.getState().conversations;
    const onlineUsers = store.getState().onlineUsers;
    dispatch(search(data, currentConvos, onlineUsers));
  } catch (error) {
    console.error(error);
  }
};

const reducer = (state = [], action) => {
  switch (action.type) {
    case SEARCH:
      const currentConvoUsernames = action.payload.currentConvos.map(
        (convo) => convo.otherUser.username
      );

      const fakeConvos = action.payload.users
        .filter((user) => !currentConvoUsernames.includes(user.username))
        .map((user) => {
          if (action.payload.onlineUsers.includes(user.id.toString())) {
            user.online = true;
          }
          return { otherUser: user, messages: [] };
        });

      return fakeConvos;
    case REMOVE: {
      return state.filter((convo) => convo.otherUser.id !== action.userId);
    }

    default:
      return state;
  }
};

export default reducer;