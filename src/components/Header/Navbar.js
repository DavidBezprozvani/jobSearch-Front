import React from 'react';
import { AppBar, makeStyles, Toolbar, Typography, IconButton, Link, Button} from '@material-ui/core';
import {NavLink} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },

  navbar: {
    // background: "#5b8e99",
    background: "#00d1ab",
  },

  link: {
    margin: theme.spacing(1, 1.5),
    color: "white",
    textDecoration: "none",
      '&:hover': {
        textDecoration: "none",
        textShadow: "0.2px 0.2px 0.2px",
      }
  },

}));

export default function Navbar() {
  const classes = useStyles();


  return (

      <AppBar className={classes.navbar} position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <img className="logo" src={'./logo.png'} />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            <Link variant="button" color="textPrimary" className={classes.link} component={NavLink}
                  to="/jobs">Jobs</Link>
            <Link variant="button" color="textPrimary" className={classes.link} component={NavLink}
                  to="/companies">Companies</Link>
            <Link variant="button" color="textPrimary" className={classes.link} component={NavLink}
                  to="/about">About</Link>
          </Typography>
          <Button color="primary" className={classes.link} component={NavLink} to="/login">Login</Button>
        </Toolbar>
      </AppBar>

  )
}