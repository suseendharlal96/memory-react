import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { CircularProgress, Grid, Typography } from "@material-ui/core";

import Post from "./Post/Post";
import useSusee from "./styles";

const Posts = ({ setEditId }) => {
  const classes = useSusee();
  const postData = useSelector((state) => state.postReducer);
  return postData.loading ? (
    <CircularProgress />
  ) : postData.posts && postData.posts.length > 0 ? (
    <Grid
      className={classes.container}
      container
      alignItems="stretch"
      spacing={3}
    >
      {postData.posts.map((post) => (
        <Grid key={post._id} item xs={12} sm={6} md={6}>
          <Post post={post} setEditId={setEditId} />
        </Grid>
      ))}
    </Grid>
  ) : (
    <Typography variant="h6">No memories found</Typography>
  );
};

export default Posts;
