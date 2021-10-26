import React from "react";
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
  ab: yup.string("Enter some info about yourself").required("About is required"),
});
let Login;
export default Login = () => {
  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      ab: "",
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
      axios
        .post(`/api/v1/signup`, {
          firstName: values.firstname,
          lastName: values.lastname,
          email: values.email,
          password: values.password,
          about: values.ab,
        })
        .then((res) => {
          if (res.status === 200) {
            localStorage.clear();
            localStorage.setItem("user", JSON.stringify(res.data));
            history.push("/");
          }
          console.log(res);
        })
        .catch((err) => console.error(err));
    },
  });
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
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
                history.push("/signup");
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
            id="firstname"
            name="firstname"
            label="First Name"
            value={formik.values.firstname}
            onChange={formik.handleChange}
            error={formik.touched.firstname && Boolean(formik.errors.firstname)}
            helperText={formik.touched.firstname && formik.errors.firstname}
            sx={{ margin: "10px" }}
          />
          <TextField
            fullWidth
            id="lastname"
            name="lastname"
            label="Last Name"
            value={formik.values.lastname}
            onChange={formik.handleChange}
            error={formik.touched.lastname && Boolean(formik.errors.lastname)}
            helperText={formik.touched.lastname && formik.errors.lastname}
            sx={{ margin: "10px" }}
          />
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
          <TextField
            fullWidth
            id="ab"
            name="ab"
            label="About"
            value={formik.values.ab}
            onChange={formik.handleChange}
            error={formik.touched.ab && Boolean(formik.errors.ab)}
            helperText={formik.touched.ab && formik.errors.ab}
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
