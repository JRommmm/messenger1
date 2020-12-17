import io from "socket.io-client";
import store from "./store";
import { setNewMessage } from "../src/store/conversations";

const socket = io(window.location.origin);

socket.on("connect", () => {
  console.log("connected to server");

  socket.on("go-online", (username) => {
    console.log("online");
  });

  // socket.on("new-message", (message) => {
  //   console.log("client new message", message);
  //   store.dispatch(setNewMessage(message));
  // });
});

export default socket;
