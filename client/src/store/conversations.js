import axios from "axios";

const GET_CONVERSATIONS = "GET_CONVERSATIONS";
const READ_MESSAGES = "READ_MESSAGES";
const SET_MESSAGE = "SEND_MESSAGE";
const CLEAR_ON_LOGOUT = "CLEAR_ON_LOGOUT";

const SET_ACTIVE_CHAT = "GET_ACTIVE_CHAT";

export const setActiveChat = (conversation) => {
  return {
    type: SET_ACTIVE_CHAT,
    conversation
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

const reducer = (state = { active: {}, all: [] }, action) => {
  switch (action.type) {
    case GET_CONVERSATIONS:
      return { ...state, all: action.conversations };
    case SET_ACTIVE_CHAT: {
      return { ...state, active: action.conversation };
    }
    case SET_MESSAGE: {
      // this can definitely be refactored to be cleaner...but I'm not sure how while also not modifying the original state

      const allCopy = [...state.all];
      const index = allCopy.findIndex((current) => current.id === action.message.conversationId);
      const conversationCopy = { ...state.all[index] };
      const messagesCopy = [...conversationCopy.messages];
      messagesCopy.push(action.message);
      conversationCopy.messages = messagesCopy;
      conversationCopy.latestMessageText = action.message.text;
      allCopy[index] = conversationCopy;

      // if we're on the active chat, also update that
      let active = state.active;
      if (state.active.id === action.message.conversationId) {
        const activeCopy = { ...state.active };
        const activeMessagesCopy = [...activeCopy.messages];
        activeMessagesCopy.push(action.message);
        activeCopy.messages = activeMessagesCopy;
        active = activeCopy;
      }

      return { active, all: allCopy };
    }
    case READ_MESSAGES: {
      const allCopy = [...state.all];
      const index = allCopy.findIndex((conversation) => conversation.id === action.conversationId);
      allCopy[index] = { ...allCopy[index] };
      allCopy[index].unreadCount = 0;
      return { ...state, all: allCopy };
    }
    case CLEAR_ON_LOGOUT: {
      return { active: {}, all: [] };
    }
    default:
      return state;
  }
};

export default reducer;
