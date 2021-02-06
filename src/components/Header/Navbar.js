import React from 'react';
import {AppBar, makeStyles, Toolbar, Typography, IconButton, Link, Button} from '@material-ui/core';
import {NavLink} from "react-router-dom";
import {removeJwt, removeUserData} from "../../store/slices/userSlice";
import useUser from "../../hooks/useUser";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import LangSwitcher from "./LangSwitcher";

const useStyles = makeStyles((theme) => ({
    logo: {
        marginRight: theme.spacing(2),
        '&:hover': {
            textDecoration: "none",
            background: "white",
        }
    },
    title: {
        flexGrow: 1,
    },

    navbar: {
        background: "white",
    },

    loginButton: {
        background: "#3d69be",
        color: "white",
        borderRadius: "15px",
        borderStyle: "solid",
        paddingLeft: "17px",
        paddingRight: "17px",
        marginLeft: "10px",
        '&:hover': {
            opacity: "0.9",
            background: "#3d69be",
        }
    },
    registerButton: {
        background: "white",
        color: "#3d69be",
        borderRadius: "15px",
        borderStyle: "solid",
        borderColor: "#3d69be",
        paddingLeft: "17px",
        paddingRight: "17px",
        marginLeft: "10px",
        '&:hover': {
            opacity: "0.9",
            background: "white",
        }
    },

    link: {
        margin: theme.spacing(4, 4),
        color: "black",
        justifyContent: "space-between",
        textDecoration: "none",
        '&:hover': {
            textDecoration: "none",
            textShadow: "0.2px 0.2px 0.2px",
        }
    },

}));


export default function Navbar() {
    const classes = useStyles();
    const user = useUser()
    const dispatch = useDispatch()

    const logout = () => {
        dispatch(removeJwt())
        dispatch(removeUserData())
    }


    return (

        <AppBar className={classes.navbar} position="static">
            <Toolbar>
                <Typography variant="h6" className={classes.title}>
                    <Link to="/" component={NavLink}>
                        <IconButton edge="start" className={classes.logo} color="inherit" aria-label="menu">
                            <img alt="navLogo" className="logo" src={'./JOBER.svg'}/>
                        </IconButton>
                    </Link>
                </Typography>
                <nav>
                    <Link variant="button" color="textPrimary" className={classes.link} component={NavLink}
                          to="/jobs">Jobs</Link>
                    <Link variant="button" color="textPrimary" className={classes.link} component={NavLink}
                          to="/companies">Companies</Link>
                    {
                        user?.roles.includes('ADMIN') && (
                            <Link variant="button" color="textPrimary" className={classes.link} component={NavLink}
                                  to="/users">Users</Link>
                        )
                    }
                    <Link variant="button" color="textPrimary" className={classes.link} component={NavLink}
                          to="/about">About</Link>
                    <LangSwitcher/>
                    {
                        !!user ? (
                                <Button className={classes.loginButton} onClick={logout}>Log Out</Button>
                        ) : (
                            <>
                                <Button component={NavLink} className={classes.loginButton} to="/login">Login</Button>
                                <Button variant="outlined" component={NavLink} className={classes.registerButton}
                                        to="/registration">Register</Button>
                            </>
                        )
                    }
                </nav>
            </Toolbar>
        </AppBar>

    )
}