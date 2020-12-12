import React from "react";
import { useHistory } from "react-router-dom";
import {
  Button,
  Input,
  InputLabel,
  FormControl,
  FormHelperText,
  Typography
} from "@material-ui/core";

const RegisterForm = (props) => {
  const { errorMessage, handleSubmit, classes } = props;
  const history = useHistory();

  return (
    <div className={classes.formContainer}>
      <form onSubmit={handleSubmit}>
        <div className={classes.nav}>
          <Typography className={classes.greyText}>Already have an account?</Typography>
          <Button
            variant="contained"
            size="large"
            className={classes.topButton}
            onClick={() => history.push("/login")}>
            Login
          </Button>
        </div>
        <div className={classes.form}>
          <Typography className={classes.title}>Create an account.</Typography>
          <FormControl margin="normal" required>
            <InputLabel required={false} htmlFor="username">
              Username
            </InputLabel>
            <Input name="username" type="text" required />
          </FormControl>
          <FormControl margin="normal" required>
            <InputLabel required={false} htmlFor="email">
              E-mail Address
            </InputLabel>
            <Input type="email" name="email" />
          </FormControl>
          <FormControl margin="normal" error={!!errorMessage.confirmPassword} required>
            <InputLabel required={false} htmlFor="password">
              Password
            </InputLabel>
            <Input type="password" inputProps={{ minLength: 6 }} name="password" required />
            <FormHelperText>{errorMessage.confirmPassword}</FormHelperText>
          </FormControl>
          <FormControl margin="normal" error={!!errorMessage.confirmPassword} required>
            <InputLabel required={false} htmlFor="confirmPassword">
              Confirm Password
            </InputLabel>
            <Input type="password" inputProps={{ minLength: 6 }} name="confirmPassword" />
            <FormHelperText>{errorMessage.confirmPassword}</FormHelperText>
          </FormControl>
          <Button className={classes.bottomButton} type="submit">
            Create
          </Button>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
