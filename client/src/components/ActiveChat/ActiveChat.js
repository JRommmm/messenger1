import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";
import { Input, Header, Messages } from "./index";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    marginLeft: 41,
    marginRight: 41,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    flexGrow: 1
  },

  activeContainer: {
    display: "flex",
    flexGrow: 1,
    flexDirection: "column"
  }
}));

const ActiveChat = (props) => {
  const classes = useStyles();
  const { conversation, user } = props;
  return (
    <Box className={classes.activeContainer}>
      {conversation.id && (
        <>
          {" "}
          <Box>
            <Header username={conversation.otherUser.username} />
          </Box>
          <Box className={classes.root}>
            <Messages
              messages={conversation.messages}
              otherUser={conversation.otherUser}
              currentId={user.id}
            />
            <Input />
          </Box>{" "}
        </>
      )}
    </Box>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    conversation: state.activeConversation
  };
};

export default connect(mapStateToProps, null)(ActiveChat);
