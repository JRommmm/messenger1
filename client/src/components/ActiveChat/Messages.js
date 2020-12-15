import React from "react";
import { Box } from "@material-ui/core";
import { SenderBubble, OtherUserBubble } from "../ActiveChat";

const Messages = (props) => {
  const { messages, otherUser, currentId } = props;
  return (
    <Box>
      {messages.map((message) => {
        return message.senderId === currentId ? (
          <SenderBubble key={message.id} text={message.text} date={message.createdAt} />
        ) : (
          <OtherUserBubble
            key={message.id}
            text={message.text}
            date={message.createdAt}
            otherUser={otherUser}
          />
        );
      })}
    </Box>
  );
};

export default Messages;
