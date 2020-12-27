import axios from "axios";
import { remove } from "./searchedConversations";
import socket from "../socket";
import store from "../store/index";

const GET_CONVERSATIONS = "GET_CONVERSATIONS";
const SET_MESSAGE = "SEND_MESSAGE";
const READ_MESSAGES = "READ_MESSAGES";
const ADD_ONLINE_USER = "ADD_ONLINE_USER";
const REMOVE_OFFLINE_USER = "REMOVE_OFFLINE_USER";
const ADD_CONVERSATION = "ADD_CONVERSATION";

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

// add new conversation when sending a new message
export const addConversation = (newConvo) => {
  return {
    type: ADD_CONVERSATION,
    newConvo
  };
};

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
    const currentState = store.getState();
    dispatch(setNewMessage(data, userId));
    socket.emit("new-message", { message: data, recipientId: message.recipientId });
    // if a convo hasn't been created yet, remove from fake convos and merge
    if (!message.conversationId) {
      const fakeConvo = currentState.searchedConversations.find(
        (convo) => convo.otherUser.id == message.recipientId
      );
      const newConvo = { ...fakeConvo };
      newConvo.id = data.conversationId;
      newConvo.messages.push(data);
      dispatch(addConversation(newConvo));
      dispatch(remove(message.recipientId));
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
      return action.conversations;
    case ADD_CONVERSATION:
      return [...state, action.newConvo];

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

    case ADD_ONLINE_USER: {
      return state.map((convo) => {
        if (convo.otherUser.id === action.id) {
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
        if (convo.otherUser.id === action.id) {
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
