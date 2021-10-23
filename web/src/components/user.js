import React from "react";
import Paper from "@mui/material/Paper";

const User = () => {
  const local = JSON.parse(localStorage.getItem("user"));
  if (local) {
    return (
      <Paper>
        <div>{`Username : ${local?.firstName + local?.lastName}`}</div>
        <div>{`Email : ${local?.email}`}</div>
        <div>{`About : ${local?.about}`}</div>
      </Paper>
    );
  }
  else {
      return (<div>User Not Found!</div>)
  }
};

export default User;