import React, { useState, useRef } from "react";
import { Typography, TextField, Button } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";

import useStyles from "./styles";
import * as actions from "../../store/actions/index";

const PostComment = ({ post }) => {
  const classes = useStyles();
  const history = useHistory();
  const commentRef = useRef();
  const [comments, setComments] = useState(post?.comments);
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const authData = useSelector((state) => state.authReducer?.authData?.result);
  const handleComment = async () => {
    if (authData) {
      console.log(post);
      const finalComment = `${authData.name ? authData.name : authData.email} : ${comment}`;
      console.log(finalComment);
      const updatedComments = await dispatch(actions.commentPost(finalComment, post?._id));
      console.log(updatedComments);
      setComments(updatedComments);
      setComment("");
      commentRef.current.scrollIntoView({ behaviour: "smooth", block: "start", inline: "start" });
    } else {
      history.push("/auth");
    }
  };
  return (
    <div>
      <div className={classes.commentsOuterContainer}>
        <div className={classes.commentsInnerContainer}>
          <Typography gutterBottom variant="h6">
            Comment
          </Typography>
          {comments?.length > 0 &&
            comments.map((c, i) => (
              <Typography key={i} gutterBottom variant="subtitle1">
                {c}
              </Typography>
            ))}
          <div ref={commentRef}/>
        </div>
        <div style={{ width: "70%" }}>
          {authData ? (
            <>
              {" "}
              <Typography gutterBottom variant="h6">
                Write Comment
              </Typography>
              <TextField
                fullWidth
                rows={4}
                variant="outlined"
                label="Comment"
                multiline
                value={comment}
                onChange={({ target: { value } }) => setComment(value)}
              />
              <Button
                style={{ marginTop: "10px" }}
                fullWidth
                disabled={!comment}
                variant="contained"
                onClick={handleComment}
                color="primary"
              >
                {authData ? "Post" : "Signin"}
              </Button>
            </>
          ) : (
            <Typography gutterBottom variant="h6">
              Signin To post comments
            </Typography>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostComment;
