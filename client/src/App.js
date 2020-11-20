import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import "./App.css";
import {
  Container,
  AppBar,
  Typography,
  Grid,
  Grow,
  Toolbar,
} from "@material-ui/core";

import PostForm from "./components/PostForm";
import Posts from "./components/Posts/Posts";
import memory from "../src/images/memory.jpg";
import useSusee from "./styles";
import * as action from "./store/actions/index";
function App() {
  const classes = useSusee();
  const dispatch = useDispatch();
  const [editId, setEditId] = useState(null);
  useEffect(() => {
    dispatch(action.getPosts());
  }, []);
  return (
    <Container maxWidth="lg">
      <AppBar
        className={classes.appBar}
        position="static"
        padding={3}
        color="inherit"
      >
        <Toolbar>
          <Typography variant="h4" align="left" className={classes.heading}>
            Fond Memories
          </Typography>
          <img
            src={memory}
            alt="memory"
            className={classes.image}
            height="60"
          />
        </Toolbar>
      </AppBar>
      <Grow in>
        <Container>
          <Grid
            className={classes.mainContainer}
            container
            justify="space-between"
            alignItems="stretch"
            spacing={3}
          >
            <Grid item xs={12} sm={7}>
              <Posts setEditId={setEditId} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <PostForm editId={editId} setEditId={setEditId} />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
}

export default App;
