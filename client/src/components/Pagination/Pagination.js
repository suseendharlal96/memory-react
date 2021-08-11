import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { Pagination, PaginationItem } from "@material-ui/lab";

import * as actions from "../../store/actions/index";
import useStyles from "./styles";

const Paginate = ({ page }) => {
  const { currPage, total } = useSelector((state) => state.postReducer);
  console.log(currPage, total);
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    if (page) dispatch(actions.getPosts(page));
  }, [page]);
  
  return (
    <Pagination
      classes={{ ul: classes.ul }}
      count={total}
      page={currPage || 1}
      variant="outlined"
      color="primary"
      renderItem={(item) => <PaginationItem {...item} component={Link} to={`/posts?page=${item.page}`} />}
    />
  );
};

export default Paginate;
