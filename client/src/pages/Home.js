import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { Grid, Container, Grow, Typography, Paper, AppBar, TextField, Button } from "@material-ui/core";
import ChipInput from "material-ui-chip-input";

import Posts from "../components/Posts/Posts";
import PostForm from "../components/PostForm/PostForm";
import Pagination from "../components/Pagination/Pagination";
import * as action from "../store/actions/index";
import useStyles from "./styles";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const authData = useSelector((state) => state.authReducer.authData);
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");
  const [tags, setTags] = useState([]);
  const history = useHistory();
  const query = useQuery();
  const page = query.get("page") || 1;
  const searchQuery = query.get("searchQuery");

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchPost();
    }
  };

  const handleAddChip = (tag) => {
    setTags([...tags, tag]);
  };

  const handleDeleteChip = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const searchPost = () => {
    if (search.trim() || tags.length > 0) {
      dispatch(action.getPostsBySearch({ search, tags: tags.join(",") }));
      history.push(`/posts/search?searchQuery=${search || "none"}&tags=${tags.join(",")}`);
    } else {
      history.push("/");
    }
  };

  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid container justify="space-between" alignItems="stretch" spacing={3} className={classes.mainContainer}>
          <Grid item xs={12} sm={6} md={9}>
            <Posts setEditId={setEditId} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBar className={classes.appBarSearch} position="static" color="inherit">
              <TextField
                name="search"
                variant="outlined"
                label="Search memories"
                fullWidth
                onKeyPress={handleKeyPress}
                value={search}
                onChange={({ target: { value } }) => setSearch(value)}
              />
              <ChipInput
                style={{ margin: "10px 0" }}
                value={tags}
                onAdd={(tag) => handleAddChip(tag)}
                onDelete={(tag) => handleDeleteChip(tag)}
                variant="outlined"
                label="Search tags"
              />
              <Button onClick={searchPost} variant="contained" className={classes.searchButton} color="primary">
                Search
              </Button>
            </AppBar>
            {authData ? (
              <PostForm editId={editId} setEditId={setEditId} />
            ) : (
              <Typography variant="h6">Signin to create your own fond memories as souvenirs and like other's memories.</Typography>
            )}
            {!searchQuery && !tags.length && (
              <Paper className={classes.pagination} elevation={6}>
                <Pagination page={page} />
              </Paper>
            )}
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
