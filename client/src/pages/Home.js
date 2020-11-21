import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Grid, Container, Grow, Typography } from "@material-ui/core";

import Posts from "../components/Posts/Posts";
import PostForm from "../components/PostForm/PostForm";
import useSusee from "./styles";
import * as action from "../store/actions/index";

const Home = () => {
  const classes = useSusee();
  const dispatch = useDispatch();
  const authData = useSelector((state) => state.authReducer.authData);
  const [editId, setEditId] = useState(null);
  useEffect(() => {
    dispatch(action.getPosts());
  }, []);
  return (
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
            {authData ? (
              <PostForm editId={editId} setEditId={setEditId} />
            ) : (
              <Typography variant="h6">
                Signin to create your own fond memories as souvenirs and like
                other's memories.
              </Typography>
            )}
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
