import io from "socket.io-client";
import store from "./store";
import { setNewMessage, setConnectedUsers } from "../src/store/conversations";

const socket = io(window.location.origin);

socket.on("connect", () => {
  console.log("connected to server");

  socket.on("get-online-users", (data) => {
    store.dispatch(setConnectedUsers(data));
  });
  // recieve message from server
  socket.on("new-message", (message) => {
    store.dispatch(setNewMessage(message));
  });
});

export default socket;
