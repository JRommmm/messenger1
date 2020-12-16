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
  const { conversation, user } = props;
  const { otherUser, messages, id } = conversation;

  return (
    <Box className={classes.root}>
      {conversation.id && (
        <>
          {" "}
          <Box>
            <Header username={otherUser.username} />
          </Box>
          <Box className={classes.container}>
            <Messages messages={messages} otherUser={otherUser} currentId={user.id} />
            <Input otherUserId={otherUser.id} conversationId={id} />
          </Box>{" "}
        </>
      )}
    </Box>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    conversation: state.conversations.active
  };
};

export default connect(mapStateToProps, null)(ActiveChat);
