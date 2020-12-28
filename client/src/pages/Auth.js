import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
import axios from "axios";
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
import Icon from "./icon";
import * as action from "../store/actions/index";
import * as actionType from "../store/actions/actionType";

const Auth = () => {
  const history = useHistory();
  const classes = useSusee();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.authReducer.loading);
  const errors = useSelector((state) => state.authReducer.errors);
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
    isSignup ? signup(e) : dispatch(action.signin(form, history));
  };
  const signup = (e) => {
    if (document.getElementById("profile-upload").value) {
      const data = new FormData(e.target);
      data.append("file", form.profile, form);
      dispatch(action.signup(data, history));
    } else {
      dispatch(action.signupWithoutFile(form, history));
    }
  };
  const handleClickShowPassword = () => {
    setIsShowPassword((prevState) => !prevState);
  };
  const googleSuccess = async (res) => {
    const data = res && res.profileObj;
    try {
      const {
        data: { sub },
      } = await axios.get(
        `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${res.tokenId}`
      );
      const result = { result: { ...data, sub: sub }, token: res.tokenId };
      dispatch({
        type: actionType.AUTH_SUCCESS,
        data: result,
      });
      history.push("/");
    } catch (err) {
      console.log(err);
    }
    // localStorage.setItem("token", res && res.tokenId);
  };
  const googleError = (res) => {
    console.log(res);
    alert("Google signin was unsuccessful.Try again later");
  };
  const handleFile = (e) => {
    e.preventDefault();
    setForm({ ...form, profile: e.target.files[0] });
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
            {/* <FileBase
              type="file"
              multiple={false}
              onDone={({ base64 }) => setForm({ ...form, profile: base64 })}
            /> */}
            <input type="file" id="profile-upload" onChange={handleFile} />
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
        <>
          <Button
            variant="contained"
            color="secondary"
            size="small"
            onClick={changeMode}
            disabled={loading}
          >
            {isSignup ? "Have an account?" : "New user?"}
          </Button>
          <Button
            className={classes.buttonSubmit}
            variant="contained"
            color="primary"
            type="submit"
            // fullWidth
            disabled={loading}
          >
            {isSignup ? "Signup" : "Signin"}
          </Button>
          {loading && (
            <CircularProgress size={24} className={classes.buttonProgress} />
          )}
        </>
      </div>
      <GoogleLogin
        clientId={process.env.REACT_APP_CLIENT_ID}
        buttonText="Signin"
        render={(renderProps) => (
          <Button
            color="primary"
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
            startIcon={<Icon />}
            variant="contained"
          >
            Google Signin
          </Button>
        )}
        onSuccess={googleSuccess}
        onFailure={googleError}
        cookiePolicy={"single_host_origin"}
      />
    </form>
  );
};

export default Auth;
