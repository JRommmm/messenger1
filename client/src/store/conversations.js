import axios from "axios";
import socket from "../socket";
import store from "../store/index";

const GET_CONVERSATIONS = "GET_CONVERSATIONS";
const SET_MESSAGE = "SEND_MESSAGE";
const READ_MESSAGES = "READ_MESSAGES";
const ADD_ONLINE_USERS = "ADD_ONLINE_USERS";
const ADD_ONLINE_USER = "ADD_ONLINE_USER";
const REMOVE_OFFLINE_USER = "REMOVE_OFFLINE_USER";

const gotConversations = (conversations) => {
  return {
    type: GET_CONVERSATIONS,
    conversations
  };
};

export const setNewMessage = (message, userId) => {
  return {
    type: SET_MESSAGE,
    payload: { message, userId }
  };
};

const readMessages = (conversationId) => {
  return {
    type: READ_MESSAGES,
    conversationId
  };
};

// add online users to conversations after conversations load
export const addOnlineUsers = (onlineUsers) => {
  return {
    type: ADD_ONLINE_USERS,
    onlineUsers
  };
};

export const addOnlineUser = (id) => {
  return {
    type: ADD_ONLINE_USER,
    id
  };
};

export const removeOfflineUser = (id) => {
  return {
    type: REMOVE_OFFLINE_USER,
    id
  };
};

export const fetchConversations = () => async (dispatch) => {
  try {
    const { data } = await axios.get("/api/conversations");
    dispatch(gotConversations(data));
    const onlineUsers = store.getState().onlineUsers;
    dispatch(addOnlineUsers(onlineUsers));
  } catch (error) {
    console.error(error);
  }
};

// message format to send: {recipientId, text, conversationId}
// conversationId will be set to null if its a brand new conversation
export const postMessage = (message) => async (dispatch) => {
  try {
    const { data } = await axios.post("/api/messages", message);
    const currentState = store.getState();
    dispatch(setNewMessage(data, currentState.user.id));
    if (currentState.onlineUsers.includes(message.recipientId.toString())) {
      socket.emit("new-message", { message: data, recipientId: message.recipientId });
    }
  } catch (error) {
    console.error(error);
  }
};

export const setMessagesAsRead = (conversationId) => async (dispatch) => {
  try {
    await axios.put("/api/conversations/read", { conversationId });
    dispatch(readMessages(conversationId));
  } catch (error) {
    console.error(error);
  }
};

const reducer = (state = [], action) => {
  switch (action.type) {
    case GET_CONVERSATIONS:
      action.conversations.forEach((convo) => {
        convo.otherUser = convo["user1"] || convo["user2"];
      });
      return action.conversations;

    case SET_MESSAGE: {
      const { message, userId } = action.payload;

      return state.map((convo) => {
        if (convo.id === message.conversationId) {
          const convoCopy = { ...convo };
          if (message.senderId !== userId) {
            convoCopy.unreadCount++;
          }
          convoCopy.messages.push(message);
          convoCopy.latestMessageText = message.text;
          return convoCopy;
        } else {
          return convo;
        }
      });
    }

    case READ_MESSAGES: {
      return state.map((convo) => {
        if (convo.id === action.conversationId) {
          const convoCopy = { ...convo };
          convoCopy.unreadCount = 0;
          return convoCopy;
        } else {
          return convo;
        }
      });
    }

    case ADD_ONLINE_USERS: {
      return state.map((convo) => {
        if (action.onlineUsers.includes(convo.otherUser.id.toString())) {
          const convoCopy = { ...convo };
          convoCopy.otherUser.online = true;
          return convoCopy;
        } else {
          return convo;
        }
      });
    }

    case ADD_ONLINE_USER: {
      return state.map((convo) => {
        if (convo.otherUser.id == action.id) {
          const convoCopy = { ...convo };
          convoCopy.otherUser.online = true;
          return convoCopy;
        } else {
          return convo;
        }
      });
    }

    case REMOVE_OFFLINE_USER: {
      return state.map((convo) => {
        if (convo.otherUser.id == action.id) {
          const convoCopy = { ...convo };
          convoCopy.otherUser.online = false;
          return convoCopy;
        } else {
          return convo;
        }
      });
    }
    default:
      return state;
  }
};

export default reducer;
