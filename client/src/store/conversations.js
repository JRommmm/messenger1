import axios from "axios";

const GET_CONVERSATIONS = "GET_CONVERSATIONS";

const gotConversations = (conversations) => {
  return {
    type: GET_CONVERSATIONS,
    conversations
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

const reducer = (state = [], action) => {
  switch (action.type) {
    case GET_CONVERSATIONS:
      return action.conversations;
    default:
      return state;
  }
};

export default reducer;
