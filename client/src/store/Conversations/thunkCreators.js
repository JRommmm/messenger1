import axios from "axios";
import socket from "../../socket";
import {
  gotConversations,
  addConversation,
  setNewMessage,
  setMessagesAsRead,
  setSearchedUsers
} from "../Conversations/conversations";

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

export const readMessages = (conversationId) => async (dispatch) => {
  try {
    await axios.put("/api/conversations/read", { conversationId });
    dispatch(setMessagesAsRead(conversationId));
  } catch (error) {
    console.error(error);
  }
};

export const searchUsers = (searchTerm) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/users/${searchTerm}`);
    dispatch(setSearchedUsers(data));
  } catch (error) {
    console.error(error);
  }
};
