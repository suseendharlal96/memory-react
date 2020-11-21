import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  Typography,
  TextField,
  Button,
  CircularProgress,
} from "@material-ui/core";
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
  const changeMode = () => {
    setIsSignup((prevState) => !prevState);
    setForm({ ...form, profile: "", confirmPassword: "" });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    isSignup
      ? dispatch(action.signup(form, history))
      : dispatch(action.signin(form, history));
    // setForm({
    //   email: "",
    //   password: "",
    //   confirmPassword: "",
    //   profile: "",
    // });
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
      <TextField
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
        helperText={errors && errors?.email && errors?.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <TextField
        name="Password"
        variant="outlined"
        label="Password"
        type="password"
        error={
          errors && errors?.password
            ? true
            : false || (errors && errors?.message)
            ? true
            : false
        }
        value={form.password}
        helperText={errors && errors?.password && errors?.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      {/* {errors && errors?.password && (
        <Typography color="error" align="center" variant="h6">
          {errors?.password}
        </Typography>
      )} */}
      {isSignup && (
        <>
          <TextField
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
            helperText={
              errors && errors?.confirmPassword && errors?.confirmPassword
            }
            onChange={(e) =>
              setForm({ ...form, confirmPassword: e.target.value })
            }
          />
          {/* {errors && errors?.confirmPassword && (
            <Typography color="error" align="center" variant="h6">
              {errors?.confirmPassword}
            </Typography>
          )} */}
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
        Switch to {isSignup ? "Signin" : "Signup"}
      </Button>
    </form>
  );
};

export default Auth;
