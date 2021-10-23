import React, { useEffect, useState } from "react";
import axios from "axios";
import * as yup from "yup";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import User from './user'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation
} from "react-router-dom";

const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});
let Dashboard;
export default Dashboard = () => {
  const history = useHistory();
  useEffect(()=> {
    if (localStorage.getItem("user")) {
      history.push("/dashboard");
    }
  },[]);
  const [todo, setTodo] = useState("");
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
            >Dashboard</Typography>
            <Button color="inherit" onClick={() => {
                localStorage.clear();
                history.push("/");
            }}>Logout</Button>
          </Toolbar>
        </AppBar>
      </Box>
      <User />

      <Box sx={{ margin: "50px auto" }}>
          <TextField
            fullWidth
            id="todo"
            name="todo"
            label="Todo"
            value = {todo}
            onChange = {(e) => {
                
                setTodo(e.target.value);
            }}
          />

          <Button color="primary" variant="contained" fullWidth onClick = {() => {

          }} >
            Add Todo
          </Button>
      </Box>
    </div>
  );
};
