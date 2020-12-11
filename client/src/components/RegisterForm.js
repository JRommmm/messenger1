import React from "react";
import { Button, Input, InputLabel, FormControl, FormHelperText } from "@material-ui/core";

const RegisterForm = (props) => {
  const { errorMessage, handleSubmit } = props;

  return (
    <form onSubmit={handleSubmit}>
      <FormControl required>
        <InputLabel htmlFor="username">Username</InputLabel>
        <Input name="username" type="text" required />
      </FormControl>
      <FormControl required>
        <InputLabel htmlFor="email">E-mail Address</InputLabel>
        <Input type="email" name="email" />
      </FormControl>
      <FormControl error={!!errorMessage.confirmPassword} required>
        <InputLabel htmlFor="password">Password</InputLabel>
        <Input type="password" inputProps={{ minLength: 6 }} name="password" required />
        <FormHelperText>{errorMessage.confirmPassword}</FormHelperText>
      </FormControl>
      <FormControl error={!!errorMessage.confirmPassword} required>
        <InputLabel htmlFor="confirmPassword">Confirm Password</InputLabel>
        <Input type="password" inputProps={{ minLength: 6 }} name="confirmPassword" />
        <FormHelperText>{errorMessage.confirmPassword}</FormHelperText>
      </FormControl>
      <Button type="submit">Create</Button>
    </form>
  );
};

export default RegisterForm;
