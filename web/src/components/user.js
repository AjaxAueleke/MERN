import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import useMediaQuery from "@mui/material/useMediaQuery";
import TextField from "@mui/material/TextField";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import Button from "@material-ui/core/Button";
import axios from 'axios';
import "./User.css";
/*    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <ImageIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Photos" secondary="Jan 9, 2014" />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <WorkIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Work" secondary="Jan 7, 2014" />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <BeachAccessIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Vacation" secondary="July 20, 2014" />
      </ListItem>
    </List> */
const User = () => {
  const mobile = useMediaQuery("(max-width:600px)");
  const tablet = useMediaQuery("(min-width:992px)");
  console.log(mobile, tablet);
  const local = JSON.parse(localStorage.getItem("user"));
  const mbdesign = {
    margin: "20px auto",
    padding: "10px",
    fontSize: "1.25rem",
    fontStyle: "bold",
    width: "90%",
  };
  const tbdesign = {};
  const [first, setFirst] = useState(local.firstName);

  const [last, setLast] = useState(local.lastName);

  const [email, setEmail] = useState(local.email);

  const [about, setAbout] = useState(local.about);

  const [editing, setEditing] = useState(true);
  if (local) {
    return (
      <Paper sx={mobile ? mbdesign : tbdesign}>
        <List>
          <ListItem
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
            }}
          >
            <h1 style={{ fontSize: "1.25rem", padding: "5px" }}>
              User Details
            </h1>
            <ModeEditIcon
              onClick={() => {
                console.log("Clicked");
                setEditing(false);
              }}
            />
          </ListItem>
          <ListItem>
            <TextField
              class="disabled-form"
              variant="standard"
              disabled={editing}
              value={first}
              onChange={(e) => {
                setFirst(e.target.value);
              }}
            />
          </ListItem>
          <ListItem>
            <TextField
              class="disabled-form"
              variant="standard"
              disabled={editing}
              value={last}
              onChange={(e) => {
                setLast(e.target.value);
              }}
            />
          </ListItem>
          <ListItem>
            <TextField
              class="disabled-form"
              variant="standard"
              disabled={editing}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </ListItem>
          <ListItem sx={{ display: "flex", justifyContent: "space-between" }}>
            <TextField
              class="disabled-form"
              variant="standard"
              disabled={editing}
              value={about}
              onChange={(e) => {
                setAbout(e.target.value);
              }}
            />
          </ListItem>
          <ListItem>
            <Button variant="contained" sx = {{fontStyle : 'bold'}} disabled={editing} onClick = {() => {
              axios.post("/api/v1/updateDetails", {
                firstName : first,
                lastName : last,
                email : email,
                about : about,
                userId : local._id
              }).then(res => {
                localStorage.setItem("user", JSON.stringify(res.data));
              })
              .catch(err => {
                alert("Data was not updated");
              })
            }}>
              Update
            </Button>
          </ListItem>
        </List>
      </Paper>
    );
  } else {
    return <div>User Not Found!</div>;
  }
};

export default User;
