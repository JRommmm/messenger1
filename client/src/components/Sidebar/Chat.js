import React from "react";
import { Box, Typography } from "@material-ui/core";
import { BadgeAvatar } from "../Sidebar";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: 8,
    height: 80,
    width: 300,
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
  const { username, typing, notifications } = props;

  let previewText = "";
  let previewTextClass = "";
  if (typing === true) {
    previewText = "Typing...";
    previewTextClass = classes.typing;
  } else if (notifications > 0) {
    previewText = props.text;
    previewTextClass = classes.unread;
  } else {
    previewText = props.text;
    previewTextClass = classes.read;
  }

  return (
    <Box className={classes.root}>
      <BadgeAvatar profileUrl={props.profileUrl} sidebar={true} />
      <Box className={classes.container}>
        <Box className={classes.textContainer}>
          <Typography className={classes.username}>{username}</Typography>
          <Typography className={previewTextClass}>{previewText}</Typography>
        </Box>
        <Box className={classes.notification}>{notifications}</Box>
      </Box>
    </Box>
  );
};

export default Chat;
