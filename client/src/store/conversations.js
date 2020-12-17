import axios from "axios";
import socket from "../socket";
import store from "../store/index";

// TODO: refactor into multiple reducers?

const GET_CONVERSATIONS = "GET_CONVERSATIONS";
const READ_MESSAGES = "READ_MESSAGES";
const SET_MESSAGE = "SEND_MESSAGE";
const CLEAR_ON_LOGOUT = "CLEAR_ON_LOGOUT";
const SET_ACTIVE_CHAT = "GET_ACTIVE_CHAT";
const SET_CONNECTED_USERS = "SET_CONNECTED_USERS";
const ADD_CONNECTED_USERS = "ADD_CONNECTED_USERS";

export const setActiveChat = (conversationId) => {
  return {
    type: SET_ACTIVE_CHAT,
    conversationId
  };
};

export const clearOnLogout = () => {
  return {
    type: CLEAR_ON_LOGOUT
  };
};

const gotConversations = (conversations) => {
  return {
    type: GET_CONVERSATIONS,
    conversations
  };
};

// set online users from socket event
export const setConnectedUsers = (connectedUsers) => {
  return {
    type: SET_CONNECTED_USERS,
    connectedUsers
  };
};

// add online users to conversations
export const addConnectedUsers = (connectedUsers) => {
  return {
    type: ADD_CONNECTED_USERS,
    connectedUsers
  };
};
const readMessages = (conversationId) => {
  return {
    type: READ_MESSAGES,
    conversationId
  };
};

export const setNewMessage = (message, userId) => {
  return {
    type: SET_MESSAGE,
    payload: { message, userId }
  };
};

// message format: {recipientId, text, conversationId} ---> conversationId will be set to null if its a brand new conversation
export const postMessage = (message) => async (dispatch) => {
  try {
    const { data } = await axios.post("/api/messages", message);
    const currentState = store.getState();
    dispatch(setNewMessage(data, currentState.user.id));
    const connectedUsers = currentState.conversations.connected;

    if (connectedUsers[message.recipientId]) {
      socket.emit("new-message", { message: data, recipientId: message.recipientId });
    }
  } catch (error) {
    console.error(error);
  }
};

export const fetchConversations = () => async (dispatch) => {
  try {
    const { data } = await axios.get("/api/conversations");
    dispatch(gotConversations(data));
    dispatch(addConnectedUsers());
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

const reducer = (state = { active: null, all: [], connected: {} }, action) => {
  switch (action.type) {
    case GET_CONVERSATIONS:
      return { ...state, all: action.conversations };
    case SET_ACTIVE_CHAT: {
      return { ...state, active: action.conversationId };
    }
    case SET_CONNECTED_USERS: {
      return {
        ...state,
        connected: action.connectedUsers
      };
    }
    case SET_MESSAGE: {
      const { message, userId } = action.payload;
      const allCopy = state.all.map((conversation) => {
        if (conversation.id === message.conversationId) {
          const conversationCopy = { ...conversation };
          if (message.senderId !== userId) {
            conversationCopy.unreadCount++;
          }
          const messagesCopy = [...conversationCopy.messages];
          messagesCopy.push(message);
          conversationCopy.messages = messagesCopy;
          conversationCopy.latestMessageText = message.text;
          return conversationCopy;
        } else {
          return conversation;
        }
      });

      return { ...state, all: allCopy };
    }
    case READ_MESSAGES: {
      const allCopy = state.all.map((conversation) => {
        if (conversation.id === action.conversationId) {
          const conversationCopy = { ...conversation };
          conversationCopy.unreadCount = 0;
          return conversationCopy;
        } else {
          return conversation;
        }
      });
      return { ...state, all: allCopy };
    }
    case CLEAR_ON_LOGOUT: {
      return { active: null, all: [] };
    }
    case ADD_CONNECTED_USERS: {
      const allCopy = state.all.map((conversation) => {
        if (state.connected[conversation.otherUser.id]) {
          const conversationCopy = { ...conversation };
          conversationCopy.otherUser.online = true;
          return conversationCopy;
        } else {
          return conversation;
        }
      });
      return { ...state, all: allCopy };
    }
    default:
      return state;
  }
};

export default reducer;
