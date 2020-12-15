import React from "react";
import { Box, Typography } from "@material-ui/core";
import { Search, Chat, BadgeAvatar } from "./index.js";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { makeStyles } from "@material-ui/core/styles";
import { currentUser, conversations } from "../../testData";

const useStyles = makeStyles((theme) => ({
  container: {
    width: 342,
    paddingLeft: 21,
    paddingRight: 21
  },
  userContainer: {
    width: 292,
    height: 44,
    marginTop: 23,
    marginLeft: 6,
    display: "flex",
    alignItems: "center"
  },
  userSubContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexGrow: 1
  },
  chatsTitle: {
    fontSize: 20,
    letterSpacing: -0.29,
    fontWeight: "bold",
    marginTop: 32,
    marginBottom: 15
  },
  currentUsername: {
    letterSpacing: -0.23,
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 17
  },
  ellipsis: {
    color: "#95A7C4",
    marginRight: 24,
    opacity: 0.5
  }
}));

const Sidebar = (props) => {
  const classes = useStyles();
  return (
    <Box className={classes.container}>
      <Box className={classes.userContainer}>
        <BadgeAvatar profileUrl={currentUser.profilePic} />
        <Box className={classes.userSubContainer}>
          <Typography className={classes.currentUsername}>{currentUser.username}</Typography>
          <MoreHorizIcon classes={{ root: classes.ellipsis }} />
        </Box>
      </Box>
      <Typography className={classes.chatsTitle}>Chats</Typography>
      <Search />
      {conversations.map((conversation) => {
        let otherUser = conversation["user1"] || conversation["user2"];

        return (
          <Chat
            key={conversation.id}
            username={otherUser.username}
            profileUrl={otherUser.profilePic}
            notifications={conversation.unread.length}
            typing={conversation.typing}
            text={conversation.latestMessageText}
          />
        );
      })}
    </Box>
  );
};

export default Sidebar;
