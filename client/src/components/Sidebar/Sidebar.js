import React, { useEffect } from "react";
import { Box, Typography } from "@material-ui/core";
import { Search, Chat, BadgeAvatar } from "./index.js";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { makeStyles } from "@material-ui/core/styles";
import { currentUser, conversations } from "../../testData";
import { connect } from "react-redux";
import { fetchConversations } from "../../store/conversations";

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
  const { user, fetchConversations, conversationsData } = props;

  useEffect(() => {
    props.fetchConversations();
  }, []);

  console.log(props.conversationsData);
  return (
    <Box className={classes.container}>
      <Box className={classes.userContainer}>
        <BadgeAvatar photoUrl={user.photoUrl} />
        <Box className={classes.userSubContainer}>
          <Typography className={classes.currentUsername}>{user.username}</Typography>
          <MoreHorizIcon classes={{ root: classes.ellipsis }} />
        </Box>
      </Box>
      <Typography className={classes.chatsTitle}>Chats</Typography>
      <Search />
      {props.conversationsData.map((conversation) => {
        conversation.otherUser = conversation["user1"] || conversation["user2"];
        return <Chat conversation={conversation} key={conversation.id} />;
      })}
    </Box>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    conversationsData: state.conversations
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchConversations: () => {
      dispatch(fetchConversations());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
