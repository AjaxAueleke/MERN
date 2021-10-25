import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import User from "./user";
import { useHistory } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import useMediaQuery from "@mui/material/useMediaQuery";

const Dashboard = () => {
  const history = useHistory();
  const mobile = useMediaQuery("(max-width:600px)");
  const tablet = useMediaQuery("(max-width:992px)");
  useEffect(() => {
    if (localStorage.getItem("user")) {
      history.push("/dashboard");
    } else {
      history.push("/");
    }
  }, []);
  const [loadPosts, setLoadPosts] = useState(true);
  const [posts, setPost] = useState([]);
  useEffect(() => {
    axios
      .get(
        `http://localhost:5000/api/v1/posts/${
          JSON.parse(localStorage.getItem("user"))._id
        }`
      )
      .then((res) => {
        console.log(res);
        setPost(res.data.post);
      })
      .catch((err) => {
        console.log("Error reading data");
      });
  }, [loadPosts, setPost]);
  const [todo, setTodo] = useState("");
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Dashboard
            </Typography>
            <Button
              color="inherit"
              onClick={() => {
                localStorage.clear();
                history.push("/");
              }}
            >
              Logout
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
      <User />

      <Box sx={{ margin: "50px auto" }}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            axios
              .post("http://localhost:5000/api/v1/posts", {
                postDetails: todo,
                userId: JSON.parse(localStorage.getItem("user"))._id,
              })
              .then((res) => {
                setLoadPosts(!loadPosts);
              })
              .catch((err) => {
                console.log("Error posting  data");
              });
          }}
        >
          <TextField
            fullWidth
            id="post"
            name="post"
            label="Posts"
            value={todo}
            onChange={(e) => {
              setTodo(e.target.value);
            }}
          />

          <Button color="primary" variant="contained" type="submit" fullWidth>
            Add Post
          </Button>
        </form>
      </Box>
      <Stack sx={{ margin: "auto", textAlign: "center" }}>
        {posts.map((post) => {
          return (
            <Paper>
              <div>{post.postDetail}</div>
            </Paper>
          );
        })}
      </Stack>
    </div>
  );
};
export default Dashboard;
