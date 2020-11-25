import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Card,
  CardMedia,
  Typography,
  Button,
  CardActions,
  CardContent,
} from "@material-ui/core";
import ThumbUpAltOutlined from "@material-ui/icons/ThumbUpAltOutlined";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import LoyaltyIcon from "@material-ui/icons/Loyalty";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import useSusee from "./styles";
import * as action from "../../../store/actions/index";

const Post = ({ post, setEditId }) => {
  dayjs.extend(relativeTime);
  const dispatch = useDispatch();
  const authData = useSelector((state) => state.authReducer?.authData?.result);
  const classes = useSusee();
  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        image={
          post.image ||
          "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
        }
        title={post.title}
      />
      <div className={classes.overlay}>
        <Typography variant="h6">{post.name}</Typography>
        <Typography variant="body2">
          {dayjs(post.createdAt).fromNow()}
        </Typography>
      </div>
      {authData &&
        (authData.sub === post.creator || authData._id === post.creator) && (
          <div className={classes.overlay2}>
            <Button
              onClick={() => setEditId(post._id)}
              style={{ color: "white" }}
              size="small"
            >
              <MoreHorizIcon fontSize="default" />
            </Button>
          </div>
        )}
      <div className={classes.details}>
        <Typography variant="body2" color="textSecondary" component="h2">
          {post.tags.map((tag) => (
            <React.Fragment key={tag}>
              <LoyaltyIcon /> {tag}
            </React.Fragment>
          ))}
        </Typography>
      </div>
      <Typography
        className={classes.title}
        gutterBottom
        variant="h5"
        component="h2"
      >
        {post.title}
      </Typography>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {post.message}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        {authData ? (
          <Button
            size="small"
            color="primary"
            onClick={() => dispatch(action.likePost(post._id))}
          >
            {post.likes.length > 0 ? (
              post.likes.find(
                (like) => like === (authData.sub || authData._id)
              ) ? (
                <>
                  <ThumbUpAltIcon fontSize="small" />
                  You and
                  {post.likes.length > 2
                    ? ` ${post.likes.length - 1} others liked`
                    : ` ${post.likes.length - 1} other liked`}
                </>
              ) : (
                <>
                  <ThumbUpAltOutlined fontSize="small" />
                  {post.likes.length > 1
                    ? `${post.likes.length} likes`
                    : `${post.likes.length} like`}
                </>
              )
            ) : (
              <>
                <ThumbUpAltOutlined fontSize="small" />
                Like
              </>
            )}
          </Button>
        ) : (
          <>
            {post.likes.length > 0
              ? post.likes.length > 1
                ? `${post.likes.length} likes`
                : `${post.likes.length} like`
              : `${post.likes.length} like`}
          </>
        )}
        {authData &&
          (authData.sub === post.creator || authData._id === post.creator) && (
            <Button
              size="small"
              color="secondary"
              onClick={() => dispatch(action.deletePost(post._id))}
            >
              <DeleteIcon fontSize="small" /> Delete
            </Button>
          )}
      </CardActions>
    </Card>
  );
};

export default Post;
