import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";
import { Input, Header, Messages } from "./index";

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

const ActiveChat = () => {
  const classes = useStyles();

  return (
    <Box className={classes.activeContainer}>
      <Box>
        <Header />
      </Box>
      <Box className={classes.root}>
        <Messages />
        <Input />
      </Box>
    </Box>
  );
};

export default ActiveChat;
