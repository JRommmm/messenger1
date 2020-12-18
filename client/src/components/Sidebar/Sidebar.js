import React, { useEffect, useState } from "react";
import { Box, Typography } from "@material-ui/core";
import { Search, Chat, BadgeAvatar } from "./index.js";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { searchUsers } from "../../store/searchedConversations";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingLeft: 21,
    paddingRight: 21,
    flexGrow: 1
  },
  userContainer: {
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
  const user = props.user || {};

  const [conversations, setConversations] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    if (props.conversations) {
      setConversations(props.conversations);
    }
  }, [props.conversations]);

  useEffect(() => {
    setConversations(props.searchedConversations);
  }, [props.searchedConversations]);

  // search through already loaded convos
  const handleSearch = (event) => {
    if (event.target.value === "") {
      setConversations(props.conversations);
    } else {
      setConversations(
        props.conversations.filter((convo) => {
          return convo.otherUser.username.toLowerCase().includes(event.target.value.toLowerCase());
        })
      );
    }
  };

  // find a user by username
  const handleSubmit = async (event) => {
    event.preventDefault();
    await props.search(event.target.search.value);
  };

  return (
    <Box className={classes.container}>
      <Box className={classes.userContainer}>
        <BadgeAvatar photoUrl={user.photoUrl} online={true} />
        <Box className={classes.userSubContainer}>
          <Typography className={classes.currentUsername}>{user.username}</Typography>
          <MoreHorizIcon classes={{ root: classes.ellipsis }} />
        </Box>
      </Box>
      <Typography className={classes.chatsTitle}>Chats</Typography>
      <Search handleSearch={handleSearch} handleSubmit={handleSubmit} />
      {conversations.map((conversation) => {
        return <Chat conversation={conversation} key={conversation.otherUser.username} />;
      })}
    </Box>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    conversations: state.conversations,
    searchedConversations: state.searchedConversations
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    search: (username) => {
      dispatch(searchUsers(username));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
