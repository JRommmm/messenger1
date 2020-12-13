import React from "react";
import { Input, InputLabel, FormControl, FormHelperText } from "@material-ui/core";
import { SubmitButton } from "../components";

const RegisterForm = (props) => {
  const { errorMessage } = props;
  return (
    <>
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
      <SubmitButton text="Create" />
    </>
  );
};

export default RegisterForm;
