import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  Typography,
  InputLabel,
  FormControl,
  Button,
  CircularProgress,
  InputAdornment,
  IconButton,
  OutlinedInput,
} from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import FileBase from "react-file-base64";

import useSusee from "./authStyle";
import * as action from "../store/actions/index";

const Auth = () => {
  const history = useHistory();
  const classes = useSusee();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.authReducer.loading);
  const errors = useSelector((state) => state.authReducer.errors);
  console.log(errors);
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    profile: "",
  });
  const [isSignup, setIsSignup] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const changeMode = () => {
    setIsSignup((prevState) => !prevState);
    setForm({ ...form, profile: "", confirmPassword: "" });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    isSignup
      ? dispatch(action.signup(form, history))
      : dispatch(action.signin(form, history));
  };
  const handleClickShowPassword = () => {
    setIsShowPassword((prevState) => !prevState);
  };
  return (
    <form
      autoComplete="off"
      noValidate
      className={`${classes.root} ${classes.form}`}
      onSubmit={handleSubmit}
    >
      {errors && errors?.message && (
        <Typography color="error" align="center" variant="h6">
          {errors?.message}
        </Typography>
      )}
      <Typography align="center" variant="h6">
        {isSignup ? "Signup" : "Signin"}
      </Typography>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel required htmlFor="emaio">
          Email
        </InputLabel>
        <OutlinedInput
          placeholder="JohnDoe@email.com"
          id="email"
          name="Email"
          variant="outlined"
          error={
            errors && errors?.email
              ? true
              : false || (errors && errors?.message)
              ? true
              : false
          }
          label="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        {errors && errors?.email && errors?.email && (
          <Typography
            variant="caption"
            color="secondary"
            display="block"
            gutterBottom
          >
            {errors && errors?.email && errors?.email}
          </Typography>
        )}
      </FormControl>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel required htmlFor="password">
          Password
        </InputLabel>
        <OutlinedInput
          id="password"
          name="Password"
          variant="outlined"
          label="Password"
          type={isShowPassword ? "text" : "password"}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                edge="end"
              >
                {isShowPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
          error={
            errors && errors?.password
              ? true
              : false || (errors && errors?.message)
              ? true
              : false
          }
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        {errors && errors?.password && errors?.password && (
          <Typography
            variant="caption"
            color="secondary"
            display="block"
            gutterBottom
          >
            {errors && errors?.password && errors?.password}
          </Typography>
        )}
      </FormControl>
      {isSignup && (
        <>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel required htmlFor="confirmpassword">
              Confirm Password
            </InputLabel>
            <OutlinedInput
              id="confirmpassword"
              name="confirmpassword"
              variant="outlined"
              label="Confirm Password"
              type="password"
              value={form.confirmPassword}
              error={
                errors && errors?.confirmPassword
                  ? true
                  : false || (errors && errors?.message)
                  ? true
                  : false
              }
              onChange={(e) =>
                setForm({ ...form, confirmPassword: e.target.value })
              }
            />
            {errors && errors?.confirmPassword && errors?.confirmPassword && (
              <Typography
                variant="caption"
                color="secondary"
                display="block"
                gutterBottom
              >
                {errors && errors?.confirmPassword && errors?.confirmPassword}
              </Typography>
            )}
          </FormControl>
          <div className={classes.fileInput}>
            <Typography>Profile pic</Typography>
            <FileBase
              type="file"
              multiple={false}
              onDone={({ base64 }) => setForm({ ...form, profile: base64 })}
            />
            {form && form.profile && (
              <img
                src={form.profile}
                alt={form.email}
                height="100px"
                width="100px"
              />
            )}
          </div>
        </>
      )}
      <div className={classes.wrapper}>
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
          disabled={loading}
        >
          {isSignup ? "Signup" : "Signin"}
        </Button>
        {loading && (
          <CircularProgress size={24} className={classes.buttonProgress} />
        )}
      </div>
      <Button
        variant="contained"
        color="secondary"
        size="small"
        onClick={changeMode}
        disabled={loading}
      >
        {isSignup ? "Have an account?" : "New user?"}
      </Button>
    </form>
  );
};

export default Auth;
