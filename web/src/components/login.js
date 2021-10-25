import React, { useEffect, useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useHistory } from "react-router-dom";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(6, "Password should be of minimum 6 characters length")
    .required("Password is required"),
});
let Login;
export default Login = () => {
  const history = useHistory();
  const [error, setError] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("user")) {
      history.push("/dashboard");
    }
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      console.log(values);
      setDis(true);
      axios
        .post(`http://localhost:5000/api/v1/login`, {
          email: values.email.trim(),
          password: values.password,
        })
        .then((res) => {
          resetForm();
          if (res.status === 200) {
            localStorage.clear();
            localStorage.setItem("user", JSON.stringify(res.data));
            history.push("/dashboard");
          }
          setDis(false);
          console.log(res);
        })
        .catch((err) => {
          resetForm();
          setDis(false);
          setError(true)
          console.log(err);
        });
    },
  });
  const [dis, setDis] = useState(false);
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Login Page
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
                history.push("/signup");
              }}
            >
              Sign Up
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
        {error && (
          <Alert severity="error">Invalid email and/or password</Alert>
        )}
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
            <Button
              color="primary"
              variant="contained"
              fullWidth
              type="submit"
              disabled={dis}
            >
              Submit
            </Button>
          </form>
        </Box>
    </div>
  );
};
