import io from "socket.io-client";
import store from "./store";
import { setNewMessage, removeOfflineUser, addOnlineUser } from "../src/store/conversations";

const socket = io(window.location.origin);

socket.on("connect", () => {
  console.log("connected to server");

  socket.on("add-online-user", (id) => {
    store.dispatch(addOnlineUser(id));
  });

  socket.on("add-offline-user", (id) => {
    store.dispatch(removeOfflineUser(id));
  });
  socket.on("new-message", (message) => {
    store.dispatch(setNewMessage(message));
  });
});

export default socket;
