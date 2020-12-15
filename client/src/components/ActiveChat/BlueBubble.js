import React from "react";
import { conversation } from "../../testData";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography, Avatar } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex"
  },
  avatar: {
    height: 30,
    width: 30,
    marginRight: 11,
    marginTop: 6
  },
  usernameDate: {
    fontSize: 11,
    color: "#BECCE2",
    fontWeight: "bold",
    marginBottom: 5
  },
  bubble: {
    backgroundImage: "linear-gradient(225deg, #6CC1FF 0%, #3A8DFF 100%)",
    borderRadius: "0 10px 10px 10px"
  },
  text: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#FFFFFF",
    letterSpacing: -0.2,
    padding: 8
  }
}));

const BlueBubble = (props) => {
  const classes = useStyles();
  const { text, date, username } = props;
  return (
    <Box className={classes.root}>
      <Avatar
        alt="avatar"
        src={conversation.otherUser.profilePic}
        className={classes.avatar}></Avatar>
      <Box>
        <Typography className={classes.usernameDate}>
          {username} {date}
        </Typography>
        <Box className={classes.bubble}>
          <Typography className={classes.text}>{text}</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default BlueBubble;
