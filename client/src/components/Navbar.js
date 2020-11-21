import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { AppBar, Toolbar, Typography, Button, Avatar } from "@material-ui/core";

import useSusee from "./styles";
import * as actionType from "../store/actions/actionType";
import memory from "../images/memory.jpg";
import defaultProfile from "../images/default.jpg";

const Navbar = () => {
  const classes = useSusee();
  const history = useHistory();
  const dispatch = useDispatch();
  const authData = useSelector((state) => state.authReducer?.authData?.result);
  return (
    <AppBar
      className={classes.appBar}
      position="static"
      padding={3}
      color="inherit"
    >
      <Toolbar className={classes.toolbar}>
        <Typography
          onClick={() => history.push("/")}
          variant="h4"
          align="left"
          className={classes.heading}
        >
          Fond Memories
        </Typography>
        <img src={memory} alt="memory" className={classes.image} height="60" />
        {authData ? (
          <>
            <Avatar
              alt={authData.email}
              src={authData.profile ? authData.profile : defaultProfile}
            />
            <Button
              variant="contained"
              color="secondary"
              onClick={() => dispatch({ type: actionType.LOGOUT })}
            >
              Logout
            </Button>
          </>
        ) : (
          <Button
            variant="contained"
            color="primary"
            onClick={() => history.push("/auth")}
          >
            Signin
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
