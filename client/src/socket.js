import io from "socket.io-client";
import store from "./store";
import {
  setNewMessage,
  removeOfflineUser,
  addOnlineUser,
  addOnlineUsers
} from "../src/store/conversations";
import { setOnlineUser, setOnlineUsers, setOfflineUser } from "./store/onlineUsers";

const socket = io(window.location.origin);

socket.on("connect", () => {
  console.log("connected to server");

  socket.on("get-online-users", (onlineUsers) => {
    store.dispatch(setOnlineUsers(onlineUsers));
    store.dispatch(addOnlineUsers(onlineUsers));
  });

  socket.on("add-online-user", (id) => {
    store.dispatch(setOnlineUser(id));
    store.dispatch(addOnlineUser(id));
  });

  socket.on("add-offline-user", (id) => {
    store.dispatch(setOfflineUser(id));
    store.dispatch(removeOfflineUser(id));
  });
  socket.on("new-message", (message) => {
    store.dispatch(setNewMessage(message));
  });
});

export default socket;
