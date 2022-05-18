import React, { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import { SERVER_URL } from "../constants.js";
import Grid from "@mui/material/Grid";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import AddStudent from "./AddStudent";

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = { student: [] };
  }

  addStudent = (student) => {
    const token = Cookies.get("XSRF-TOKEN");
    fetch(`${SERVER_URL}/addStudent`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-XSRF-TOKEN": token },
      body: JSON.stringify(student),
    })
      .then((res) => {
        if (res.ok) {
          toast.success("Student successfully added", {
            position: toast.POSITION.BOTTOM_LEFT,
          });
        } else {
          toast.error("Error when adding", {
            position: toast.POSITION.BOTTOM_LEFT,
          });
          console.error("Post http status =" + res.status);
        }
      })
      .catch((err) => {
        toast.error("Error when adding", {
          position: toast.POSITION.BOTTOM_LEFT,
        });
        console.error(err);
      });
  };
  render() {
    return (
      <div>
        <AppBar position="static" color="default">
          <Toolbar>
            <Typography variant="h6" color="inherit">
              Admin Controls
            </Typography>
          </Toolbar>
        </AppBar>
        <div className="App">
          <div style={{ width: "100%" }}>
            For DEBUG: display state.
            {JSON.stringify(this.state)}
          </div>
          <Grid container>
            <Grid item>
              <AddStudent addStudent={this.addStudent} />
            </Grid>
          </Grid>
          <ToastContainer autoClose={1500} />
        </div>
      </div>
    );
  }
}

export default Admin;
