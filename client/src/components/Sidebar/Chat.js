import React, { useEffect } from "react";
import { Box, Typography } from "@material-ui/core";
import { BadgeAvatar } from "../Sidebar";
import { makeStyles } from "@material-ui/core/styles";
import { fetchActiveChat } from "../../store/activeConversation";
import { setMessagesAsRead } from "../../store/conversations";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: 8,
    height: 80,
    boxShadow: "0 2px 10px 0 rgba(88,133,196,0.05)",
    marginBottom: 10,
    display: "flex",
    alignItems: "center"
  },
  container: {
    display: "flex",
    justifyContent: "space-between",
    marginLeft: 20,
    flexGrow: 1
  },
  username: {
    fontWeight: "bold",
    letterSpacing: -0.2
  },
  typing: {
    fontSize: 12,
    color: "#94A6C4",
    letterSpacing: -0.2,
    fontStyle: "italic"
  },
  unread: {
    fontSize: 12,
    letterSpacing: -0.17,
    fontWeight: "bold"
  },
  read: {
    fontSize: 12,
    color: "#9CADC8",
    letterSpacing: -0.17
  },
  notification: {
    height: 20,
    width: 20,
    backgroundColor: "#3F92FF",
    marginRight: 10,
    color: "white",
    fontSize: 10,
    letterSpacing: -0.5,
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10
  }
}));

const Chat = (props) => {
  const classes = useStyles();
  const { latestMessageText, unreadCount, otherUser } = props.conversation;

  const handleClick = async (conversation) => {
    await props.fetchActiveChat(conversation);
    // set unread messages to read once chat loads
    await props.setMessagesAsRead(conversation.id);
  };

  let previewTextClass = "";
  if (unreadCount > 0) {
    previewTextClass = classes.unread;
  } else {
    previewTextClass = classes.read;
  }

  //TODO: pointer on hover for chatbox

  return (
    <Box onClick={(event) => handleClick(props.conversation)} className={classes.root}>
      <BadgeAvatar photoUrl={otherUser.photoUrl} username={otherUser.username} sidebar={true} />
      <Box className={classes.container}>
        <Box className={classes.textContainer}>
          <Typography className={classes.username}>{otherUser.username}</Typography>
          <Typography className={previewTextClass}>{latestMessageText}</Typography>
        </Box>
        {unreadCount > 0 && <Box className={classes.notification}>{unreadCount}</Box>}
      </Box>
    </Box>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchActiveChat: (id) => {
      dispatch(fetchActiveChat(id));
    },
    setMessagesAsRead: (id) => {
      dispatch(setMessagesAsRead(id));
    }
  };
};

export default connect(null, mapDispatchToProps)(Chat);
