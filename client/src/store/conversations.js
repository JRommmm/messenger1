import axios from "axios";

const GET_CONVERSATIONS = "GET_CONVERSATIONS";
const READ_MESSAGES = "READ_MESSAGES";

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

const reducer = (state = [], action) => {
  switch (action.type) {
    case GET_CONVERSATIONS:
      return action.conversations;
    case READ_MESSAGES: {
      const stateCopy = [...state];
      const index = state.findIndex((conversation) => conversation.id === action.conversationId);
      stateCopy[index] = { ...stateCopy[index] };
      stateCopy[index].unreadCount = 0;
      return stateCopy;
    }
    default:
      return state;
  }
};

export default reducer;
