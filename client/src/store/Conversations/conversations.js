import axios from "axios";
import socket from "../../socket";
import {
  addNewConvoToStore,
  addOnlineUserToStore,
  addSearchedUsersToStore,
  readMessagesInStore,
  removeOfflineUserFromStore,
  setMessageToStore
} from "./helperFunctions";

const GET_CONVERSATIONS = "GET_CONVERSATIONS";
const SET_MESSAGE = "SET_MESSAGE";
const READ_MESSAGES = "READ_MESSAGES";
const ADD_ONLINE_USER = "ADD_ONLINE_USER";
const REMOVE_OFFLINE_USER = "REMOVE_OFFLINE_USER";
const SEARCH = "SEARCH";
const CLEAR_SEARCHED_USERS = "CLEAR_SEARCHED_USERS";
const ADD_CONVERSATION = "ADD_CONVERSATION";

// ACTION CREATORS

const gotConversations = (conversations) => {
  return {
    type: GET_CONVERSATIONS,
    conversations
  };
};

export const setNewMessage = (message, userId, sender) => {
  return {
    type: SET_MESSAGE,
    payload: { message, userId, sender: sender || null }
  };
};

const readMessages = (conversationId) => {
  return {
    type: READ_MESSAGES,
    conversationId
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

export const search = (users) => {
  return {
    type: SEARCH,
    users
  };
};

export const clearSearchedUsers = () => {
  return {
    type: CLEAR_SEARCHED_USERS
  };
};

// add new conversation when sending a new message
export const addConversation = (recipientId, newMessage) => {
  return {
    type: ADD_CONVERSATION,
    payload: { recipientId, newMessage }
  };
};

// THUNK CREATORS

export const fetchConversations = () => async (dispatch) => {
  try {
    const { data } = await axios.get("/api/conversations");
    dispatch(gotConversations(data));
  } catch (error) {
    console.error(error);
  }
};

// message format to send: {recipientId, text, conversationId}
// conversationId will be set to null if its a brand new conversation
export const postMessage = (message, userId) => async (dispatch) => {
  try {
    const { data } = await axios.post("/api/messages", message);
    if (!message.conversationId) {
      dispatch(addConversation(message.recipientId, data.message));
    } else {
      dispatch(setNewMessage(data.message, userId));
    }

    socket.emit("new-message", {
      message: data.message,
      recipientId: message.recipientId,
      sender: data.sender
    });
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

export const searchUsers = (searchTerm) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/users/${searchTerm}`);
    dispatch(search(data));
  } catch (error) {
    console.error(error);
  }
};

// REDUCER

const reducer = (state = [], action) => {
  switch (action.type) {
    case GET_CONVERSATIONS:
      return action.conversations;
    case SET_MESSAGE:
      return setMessageToStore(state, action.payload);
    case READ_MESSAGES: {
      return readMessagesInStore(state, action.conversationId);
    }
    case ADD_ONLINE_USER: {
      return addOnlineUserToStore(state, action.id);
    }
    case REMOVE_OFFLINE_USER: {
      return removeOfflineUserFromStore(state, action.id);
    }
    case SEARCH:
      return addSearchedUsersToStore(state, action.users);
    case CLEAR_SEARCHED_USERS:
      return state.filter((convo) => convo.id);
    case ADD_CONVERSATION:
      return addNewConvoToStore(state, action.payload.recipientId, action.payload.newMessage);
    default:
      return state;
  }
};

export default reducer;
