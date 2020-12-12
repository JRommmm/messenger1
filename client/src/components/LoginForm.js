import React from "react";
import { useHistory } from "react-router-dom";
import { Button, Input, InputLabel, FormControl, Typography } from "@material-ui/core";

const LoginForm = (props) => {
  const { handleSubmit, classes } = props;
  const history = useHistory();

  return (
    <div className={classes.formContainer}>
      <form onSubmit={handleSubmit}>
        <div className={classes.nav}>
          <Typography className={classes.greyText}>Don't have an account?</Typography>
          <Button
            variant="contained"
            size="large"
            style={{ width: 150 }}
            className={classes.topButton}
            onClick={() => history.push("/register")}>
            Create Account
          </Button>
        </div>
        <div className={classes.form}>
          <Typography className={classes.title}>Welcome back!</Typography>
          <FormControl margin="normal" required>
            <InputLabel required={false} htmlFor="username">
              Username
            </InputLabel>
            <Input name="username" type="text" required />
          </FormControl>
          <FormControl margin="normal" required>
            <InputLabel required={false} htmlFor="password">
              Password
            </InputLabel>
            <Input type="password" name="password" required />
          </FormControl>
          <Button className={classes.bottomButton} type="submit">
            Login
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
