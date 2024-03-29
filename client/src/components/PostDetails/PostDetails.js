import React, { useEffect } from "react";
import { Paper, Typography, CircularProgress, Divider } from "@material-ui/core/";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory, Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import * as actions from "../../store/actions";
import useStyles from "./styles.js";
import PostComment from "./PostComment";

const PostDetails = () => {
  dayjs.extend(relativeTime);
  const { post, posts, loading } = useSelector((state) => state.postReducer);
  console.log(post, posts);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const { id } = useParams();

  useEffect(() => {
    dispatch(actions.getPost(id));
  }, [id]);

  useEffect(() => {
    if (post) {
      dispatch(actions.getPostsBySearch({ search: "paris", tags: post?.tags?.join(",") }));
    }
  }, [post]);

  if (loading) {
    return (
      <Paper elevation={6} className={classes.loadingPaper}>
        <CircularProgress size="7em" />
      </Paper>
    );
  }

  const recommendedPosts = posts?.filter(({ _id }) => _id !== post?._id);

  const openDetails = (id) => {
    history.push(`/posts/${id}`);
  };

  return post ? (
    <Paper style={{ padding: "20px", borderRadius: "15px" }} elevation={6}>
      <div className={classes.card}>
        <div className={classes.section}>
          <Typography variant="h3" component="h2">
            {post?.title}
          </Typography>
          <Typography gutterBottom variant="h6" color="textSecondary" component="h2">
            {post?.tags?.map((tag) => (
              <Link to={`/tags/${tag}`} style={{ textDecoration: "none", color: "#3f51b5" }}>
                {` #${tag} `}
              </Link>
            ))}
          </Typography>
          <Typography gutterBottom variant="body1" component="p">
            {post?.message}
          </Typography>
          <Typography variant="h6">
            Created by:
            <Link
              to={`/creators/${post?.name}`}
              style={{ textDecoration: "none", color: "#3f51b5" }}
            >
              {` ${post?.name}`}
            </Link>
          </Typography>
          <Typography variant="body1">{dayjs(post?.createdAt).fromNow()}</Typography>
          <Divider style={{ margin: "20px 0" }} />
          <PostComment post={post} />
          <Divider style={{ margin: "20px 0" }} />
        </div>
        <div className={classes.imageSection}>
          <img
            className={classes.media}
            src={
              post?.image ||
              "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
            }
            alt={post?.title}
          />
        </div>
      </div>
      {!!recommendedPosts.length && (
        <div className={classes.section}>
          <Typography gutterBottom variant="h5">
            You might also like:
          </Typography>
          <Divider />
          <div className={classes.recommendedPosts}>
            {recommendedPosts.map(({ title, name, message, likes, image, _id }) => (
              <div
                style={{ margin: "20px", cursor: "pointer" }}
                onClick={() => openDetails(_id)}
                key={_id}
              >
                <Typography gutterBottom variant="h6">
                  {title}
                </Typography>
                <Typography gutterBottom variant="subtitle2">
                  {name}
                </Typography>
                <Typography gutterBottom variant="subtitle2">
                  {message}
                </Typography>
                <Typography gutterBottom variant="subtitle1">
                  Likes: {likes.length}
                </Typography>
                <img src={image} width="200px" />
              </div>
            ))}
          </div>
        </div>
      )}
    </Paper>
  ) : (
    <h2>No details</h2>
  );
};

export default PostDetails;
