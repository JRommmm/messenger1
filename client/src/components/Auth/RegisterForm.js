import React from "react";
import { Input, FormControl, FormHelperText } from "@material-ui/core";
import { SubmitButton, FormLabel } from "../Auth";
import { REGISTER } from "../../constants";

const RegisterForm = (props) => {
  const { errorMessage } = props;

  return (
    <>
      <FormControl margin="normal" required>
        <FormLabel topMarginClass="topRegister" label="Username" />
        <Input aria-label="username" name="username" type="text" required />
      </FormControl>
      <FormControl margin="normal" required>
        <FormLabel label="E-mail address" />
        <Input aria-label="e-mail address" type="email" name="email" />
      </FormControl>
      <FormControl margin="normal" error={!!errorMessage.confirmPassword} required>
        <FormLabel label="Password" />
        <Input
          aria-label="password"
          type="password"
          inputProps={{ minLength: 6 }}
          name="password"
        />
        <FormHelperText>{errorMessage.confirmPassword}</FormHelperText>
      </FormControl>
      <FormControl margin="normal" error={!!errorMessage.confirmPassword} required>
        <FormLabel label="Confirm Password" />
        <Input
          aria-label="confirm password"
          type="password"
          inputProps={{ minLength: 6 }}
          name="confirmPassword"
        />
        <FormHelperText>{errorMessage.confirmPassword}</FormHelperText>
      </FormControl>
      <SubmitButton authType={REGISTER} />
    </>
  );
};

export default RegisterForm;
