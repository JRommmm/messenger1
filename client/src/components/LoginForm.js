import React from "react";
import { Input, InputLabel, FormControl } from "@material-ui/core";
import { SubmitButton } from "../components";

const LoginForm = (props) => {
  return (
    <>
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
      <SubmitButton text="Login" />
    </>
  );
};

export default LoginForm;
