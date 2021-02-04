import React from 'react';
import {makeStyles, Container, CssBaseline} from '@material-ui/core';

import FacebookIcon from '@material-ui/icons/Facebook';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import InstagramIcon from '@material-ui/icons/Instagram';
import {IconButton} from "@material-ui/core";
import GitHubIcon from '@material-ui/icons/GitHub';


const useStyles = makeStyles((theme) => ({


    // footer: {
    //     marginTop: "50px",
    //     padding: theme.spacing(6, 0),
    //     background: "#0b2557",
    //     color: "white",
    //     display: "flex",
    //     justifyContent: "center",
    //     alignItems: "center",
    //     textAlign: "center",
    //
    // },

    root: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
    },
    main: {
        marginTop: theme.spacing(8),
        marginBottom: theme.spacing(2),
    },
    footer: {
        padding: theme.spacing(8, 2),
        fontSize: "20px",
        marginTop: 'auto',
        backgroundColor: "#0b2557",
        color: "white",
        textAlign: "center",
    },


}));

export default function Footer() {
    const classes = useStyles();

    return (

        <div className={classes.root}>
            <CssBaseline/>
            <footer className={classes.footer}>
                <Container maxWidth="sm">
                    <div>
                        <IconButton className={classes.icons} color="inherit">
                            <FacebookIcon/>
                        </IconButton>
                        <IconButton className={classes.icons} color="inherit">
                            <InstagramIcon/>
                        </IconButton>
                        <IconButton className={classes.icons} color="inherit">
                            <LinkedInIcon/>
                        </IconButton>
                        <IconButton className={classes.icons} color="inherit">
                            <GitHubIcon/>
                        </IconButton>
                    </div>
                    <div>
                        <span>© David Bezprozvani @{new Date().getFullYear()}</span>
                    </div>
                </Container>
            </footer>
        </div>
    );
}