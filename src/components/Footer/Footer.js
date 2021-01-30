import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import FacebookIcon from '@material-ui/icons/Facebook';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import InstagramIcon from '@material-ui/icons/Instagram';
import {IconButton} from "@material-ui/core";
import GitHubIcon from '@material-ui/icons/GitHub';


const useStyles = makeStyles((theme) => ({
    footer: {
        marginTop: "100%",
        padding: theme.spacing(6, 0),
        // padding: theme.spacing(3, 2),
        // marginTop: 'auto',
        background: "#00d1ab",
        color: "white",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },


}));

export default function Footer(props) {
    const classes = useStyles();

    return (
        <footer className={classes.footer}>
            <Container maxWidth="lg">
                <IconButton className={classes.icons} color="inherit" aria-label="menu">
                    <FacebookIcon/>
                </IconButton>
                <IconButton className={classes.icons} color="inherit" aria-label="menu">
                    <InstagramIcon/>
                </IconButton>
                <IconButton className={classes.icons} color="inherit" aria-label="menu">
                    <LinkedInIcon/>
                </IconButton>
                <IconButton className={classes.icons} color="inherit" aria-label="menu">
                    <GitHubIcon/>
                </IconButton>
                <span>© David Bezprozvani @{new Date().getFullYear()}</span>
            </Container>
        </footer>
    );
}