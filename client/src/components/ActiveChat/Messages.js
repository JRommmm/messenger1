import React from "react";
import { Box } from "@material-ui/core";
import { GreyBubble, BlueBubble } from "../ActiveChat";

const Messages = (props) => {
  const { messages, otherUser, currentId } = props;
  return (
    <Box>
      {messages.map((message) => {
        if (message.senderId === currentId) {
          return <GreyBubble key={message.id} text={message.text} date={message.createdAt} />;
        } else {
          return (
            <BlueBubble
              key={message.id}
              text={message.text}
              date={message.createdAt}
              username={otherUser.username}
            />
          );
        }
      })}
    </Box>
  );
};

export default Messages;
