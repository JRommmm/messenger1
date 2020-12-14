import React from "react";
import { Box } from "@material-ui/core";
import { GreyBubble, BlueBubble } from "../ActiveChat";
import { currentUser, conversation, messages } from "../../testData";

const Messages = () => {
  return (
    <Box>
      {messages.map((message) => {
        if (message.senderId === currentUser.id) {
          // return grey bubble
          return <GreyBubble text={message.text} date={message.datePlaceholder} />;
        } else {
          return (
            <BlueBubble
              text={message.text}
              date={message.datePlaceholder}
              username={conversation.otherUser.username}
            />
          );
        }
      })}
    </Box>
  );
};

export default Messages;
