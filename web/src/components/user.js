import React from "react";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";
import WorkIcon from "@mui/icons-material/Work";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import useMediaQuery from "@mui/material/useMediaQuery";
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
  const local = JSON.parse(localStorage.getItem("user"));
  if (local) {
    return (
      <Paper>
        <List>
          <ListItem>
            <div>{`${local?.firstName}`}</div>
          </ListItem>
          <ListItem>
            <div>{`${local?.lastName}`}</div>
          </ListItem>
          <ListItem>
            <div>{`Email : ${local?.email}`}</div>
          </ListItem>
          <ListItem>

          <div>{`About : ${local?.about}`}</div>
          </ListItem>
        </List>
      </Paper>
    );
  } else {
    return <div>User Not Found!</div>;
  }
};

export default User;
