import io from "socket.io-client";
import store from "./store";
import {
  setNewMessage,
  setConnectedUsers,
  addConnectedUsers,
  removeConnectedUser,
  addOnlineUser
} from "../src/store/conversations";

const socket = io(window.location.origin);

socket.on("connect", () => {
  console.log("connected to server");

  socket.on("get-online-users", (data) => {
    store.dispatch(setConnectedUsers(data));
    store.dispatch(addConnectedUsers());
  });

  socket.on("add-user", (id) => {
    store.dispatch(addOnlineUser(id));
  });

  socket.on("disconnect-user", (id) => {
    store.dispatch(removeConnectedUser(id));
  });
  socket.on("new-message", (message) => {
    store.dispatch(setNewMessage(message));
  });
});

export default socket;
