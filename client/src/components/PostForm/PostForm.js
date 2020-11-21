import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Paper,
  Typography,
  TextField,
  Button,
  CircularProgress,
} from "@material-ui/core";
import FileBase from "react-file-base64";

import useSusee from "./styles";
import * as action from "../../store/actions/index";
const PostForm = ({ editId, setEditId }) => {
  const classes = useSusee();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.postReducer.creating);
  const posts = useSelector((state) => state.postReducer.posts);
  const errors = useSelector((state) => state.postReducer.errors);
  const editPost = editId
    ? posts && posts.length && posts.find((post) => post._id === editId)
    : null;
  const [postData, setPostData] = useState({
    title: "",
    name: "",
    creator: "",
    message: "",
    tags: "",
    image: "",
  });
  useEffect(() => {
    if (editPost) {
      setPostData(editPost);
    }
  }, [editId]);
  const clear = () => {
    setPostData({ title: "", name: "", message: "", tags: "", image: "" });
    setEditId(null);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    editPost
      ? dispatch(action.updatePost(editId, postData))
      : dispatch(action.createPost(postData));
    // clear();
  };
  return (
    <Paper className={classes.paper}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">
          {editPost ? `Edit "${postData.title}"` : "Create your Memory"}
        </Typography>
        <TextField
          name="title"
          variant="outlined"
          label="Creator"
          fullWidth
          error={errors && errors.name ? true : false}
          helperText={errors && errors.name ? errors?.name : null}
          value={postData.name}
          onChange={(e) => setPostData({ ...postData, name: e.target.value })}
        />
        <TextField
          name="title"
          variant="outlined"
          label="Memory Title"
          fullWidth
          error={errors && errors.title ? true : false}
          helperText={errors && errors.title ? errors?.title : null}
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
        <TextField
          name="message"
          variant="outlined"
          label="Message"
          fullWidth
          multiline
          rows={4}
          value={postData.message}
          error={errors && errors.message ? true : false}
          helperText={errors && errors.message ? errors?.message : null}
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
        />
        <TextField
          name="tags"
          variant="outlined"
          label="Tags (coma separated)"
          fullWidth
          value={postData.tags}
          error={errors && errors.tags ? true : false}
          helperText={errors && errors.tags ? errors?.tags : null}
          onChange={(e) =>
            setPostData({ ...postData, tags: e.target.value.split(",") })
          }
        />
        <div className={classes.fileInput}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) => setPostData({ ...postData, image: base64 })}
          />
          {postData && postData.image && (
            <img
              src={postData.image}
              alt={postData.title}
              height="100px"
              width="100px"
            />
          )}
          {errors && errors?.image && (
            <Typography align="center" color="secondary">
              {errors && errors?.image}
            </Typography>
          )}
        </div>
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
            Submit
          </Button>
          {loading && (
            <CircularProgress size={24} className={classes.buttonProgress} />
          )}
        </div>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={clear}
          fullWidth
          disabled={loading}
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default PostForm;
