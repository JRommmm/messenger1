import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";
import { Input, Header, Messages } from "./index";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  container: {
    marginLeft: 41,
    marginRight: 41,
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    justifyContent: "space-between"
  },
  root: {
    display: "flex",
    flexGrow: 8,
    flexDirection: "column"
  }
}));

const ActiveChat = (props) => {
  const classes = useStyles();
  const { user } = props;
  const conversation = props.conversation || {};

  return (
    <Box className={classes.root}>
      {conversation.otherUser && (
        <>
          <Box>
            <Header
              username={conversation.otherUser.username}
              online={conversation.otherUser.online || false}
            />
          </Box>
          <Box className={classes.container}>
            <Messages
              messages={conversation.messages}
              otherUser={conversation.otherUser}
              userId={user.id}
            />
            <Input
              otherUser={conversation.otherUser}
              conversationId={conversation.id}
              userId={user.id}
            />
          </Box>
        </>
      )}
    </Box>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    conversation:
      state.conversations &&
      state.conversations.find(
        (conversation) => conversation.otherUser.username === state.activeConversation
      )
    // ) ||
    //   (state.searchedConversations &&
    //     state.searchedConversations.find(
    //       (conversation) => conversation.otherUser.username === state.activeConversation
    //     )))
  };
};

export default connect(mapStateToProps, null)(ActiveChat);
