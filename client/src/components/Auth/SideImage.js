import React from "react";
import { Grid, Box, Typography, Hidden } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { ReactComponent as ChatIcon } from "../../assets/chat-bubble.svg";
import Image from "../../assets/bg-img.png";

const useStyles = makeStyles(() => ({
  root: {
    backgroundImage: `linear-gradient(180deg, #3A8DFF 0%, #86B9FF55 100%), url(${Image})`,
    opacity: 0.85,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    justifyContent: "center"
  },

  overlayContainer: {
    textAlign: "center",
    marginTop: 199
  },
  text: {
    fontSize: 26,
    color: "#FFFFFF"
  },
  icon: {
    marginBottom: 39
  }
}));

const SideImage = () => {
  const classes = useStyles();
  return (
    <Grid item xs={false} sm={false} md={4} className={classes.root}>
      <Hidden xsDown smDown>
        <Box className={classes.overlayContainer}>
          <ChatIcon className={classes.icon} />
          <Typography className={classes.text}>Converse with anyone</Typography>
          <Typography className={classes.text}>with any language</Typography>
        </Box>
      </Hidden>
    </Grid>
  );
};

export default SideImage;
