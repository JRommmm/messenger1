import axios from "axios";

const GET_CONVERSATIONS = "GET_CONVERSATIONS";
const READ_MESSAGES = "READ_MESSAGES";
const SET_MESSAGE = "SEND_MESSAGE";
const CLEAR_ON_LOGOUT = "CLEAR_ON_LOGOUT";

const SET_ACTIVE_CHAT = "GET_ACTIVE_CHAT";

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

const readMessages = (conversationId) => {
  return {
    type: READ_MESSAGES,
    conversationId
  };
};

const setNewMessage = (message) => {
  return {
    type: SET_MESSAGE,
    message
  };
};

// message format: {recipientId, text, conversationId} ---> conversationId will be set to null if its a brand new conversation
export const postMessage = (message) => async (dispatch) => {
  try {
    const { data } = await axios.post("/api/messages", message);
    dispatch(setNewMessage(data));
  } catch (error) {
    console.error(error);
  }
};

export const fetchConversations = () => async (dispatch) => {
  try {
    const { data } = await axios.get("/api/conversations");
    dispatch(gotConversations(data));
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

const reducer = (state = { active: null, all: [] }, action) => {
  switch (action.type) {
    case GET_CONVERSATIONS:
      return { ...state, all: action.conversations };
    case SET_ACTIVE_CHAT: {
      return { ...state, active: action.conversationId };
    }
    case SET_MESSAGE: {
      const allCopy = state.all.map((conversation) => {
        if (conversation.id === action.message.conversationId) {
          const conversationCopy = { ...conversation };
          const messagesCopy = [...conversationCopy.messages];
          messagesCopy.push(action.message);
          conversationCopy.messages = messagesCopy;
          conversationCopy.latestMessageText = action.message.text;
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
    default:
      return state;
  }
};

export default reducer;
