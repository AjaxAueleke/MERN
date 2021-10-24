import React, { useEffect } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation,
} from "react-router-dom";

const validationSchema = yup.object({
  firstname: yup
    .string("Enter you first name")
    .required("FirstName is required"),
  lastname: yup
    .string("Enter your last name")
    .required("Last Name is required"),

  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
  about: yup.string().required,
});
let Login;
export default Login = () => {
  const history = useHistory();
  useEffect(() => {
    if (localStorage.getItem("user")) {
      history.push("/dashboard");
    }
  });
  const formik = useFormik({
    initialValues: {
      firstname : "",
      lastname : "",
      about : "",
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
      axios
        .post(`http://localhost:5000/api/v1/login`, {
          email: values.email,
          password: values.password,
        })
        .then((res) => {
          if (res.status === 200) {
            localStorage.clear();
            localStorage.setItem("user", JSON.stringify(res.data));
            history.push("/dashboard");
          }
          console.log(res);
        })
        .catch((err) => console.error(`${err} Sheesh`));
    },
  });
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
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Signup
            </Typography>
            <Button
              color="inherit"
              onClick={() => {
                history.push("/");
              }}
            >
              Login
            </Button>
            <Button
              color="inherit"
              onClick={() => {
                history.push("/sign up");
              }}
            >
              Sign Up
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
      <Box sx={{ margin: "50px auto" }}>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            id="email"
            name="email"
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            sx={{ margin: "10px" }}
          />
          <TextField
            fullWidth
            id="password"
            name="password"
            label="Password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            sx={{ margin: "10px" }}
          />
          <Button color="primary" variant="contained" fullWidth type="submit">
            Sign Up
          </Button>
        </form>
      </Box>
    </div>
  );
};
