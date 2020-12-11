import React from "react";
import { Button, Input, InputLabel, FormControl } from "@material-ui/core";

const LoginForm = (props) => {
  const { errorMessage, handleSubmit } = props;

  return (
    <form onSubmit={handleSubmit}>
      <FormControl error={!!errorMessage.server} required>
        <InputLabel htmlFor="username">Username</InputLabel>
        <Input name="username" type="text" required />
      </FormControl>
      <FormControl error={!!errorMessage.server} required>
        <InputLabel htmlFor="password">Password</InputLabel>
        <Input type="password" inputProps={{ minLength: 6 }} name="password" required />
      </FormControl>
      <Button type="submit">Login</Button>
    </form>
  );
};

export default LoginForm;
