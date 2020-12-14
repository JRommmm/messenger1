import React from "react";
import { Input, FormControl } from "@material-ui/core";
import { SubmitButton, FormLabel } from "../components";
import { LOGIN } from "../constants";

const LoginForm = () => {
  return (
    <>
      <FormControl margin="normal" required>
        <FormLabel topMarginClass="topLogin" label="Username" />
        <Input aria-label="username" name="username" type="text" />
      </FormControl>
      <FormControl margin="normal" required>
        <FormLabel label="Password" />
        <Input aria-label="password" type="password" name="password" />
      </FormControl>
      <SubmitButton authType={LOGIN} />
    </>
  );
};

export default LoginForm;
