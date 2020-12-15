import axios from "axios";

const GET_ACTIVE_CHAT = "GET_ACTIVE_CHAT";

export const gotActiveChat = (conversation) => {
  return {
    type: GET_ACTIVE_CHAT,
    conversation
  };
};

export const fetchActiveChat = (conversation) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/messages/${conversation.id}`);
    conversation.messages = data.messages;
    dispatch(gotActiveChat(conversation));
  } catch (error) {
    console.error(error);
  }
};

const reducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ACTIVE_CHAT:
      return action.conversation;
    default:
      return state;
  }
};

export default reducer;
