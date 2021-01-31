import React from 'react';
import {useEffect, useState} from 'react'
import {fetchAllPosts} from "../../api/postApi";
import moment from 'moment'
import { makeStyles, Typography, List, Button, ListItemAvatar, Paper, Chip, Collapse } from "@material-ui/core";
import ReactMarkdown from 'react-markdown';
import Loader from "../../common/Loader";


const useStyles = makeStyles(() => ({

    posts: {

        maxWidth: "50%",
        margin: "10px 20px",
        padding: "20px 20px",
        alignContent: "space-between",
        alignItems: "space-between",
        justifyContent: "center",
        display: "flex",


    },
    jobs: {
        marginTop: "40px",
        display: "list-item",
        // alignContent: "space-between",
        // alignItems: "space-between",

    },

    companyLogo: {
        width: "100px",
        height: "100px",
        borderRadius: "10px",
        marginRight: "30px",
    },

    button: {
        background: "#3d69be",
        marginTop: "5px",
        color: "white",
        fontSize: "14px",
        borderRadius: "15px",
        borderStyle: "solid",
        paddingLeft: "15px",
        paddingRight: "15px",
        '&:hover': {
            opacity: "0.9",
            background: "#3d69be",
        }
    }
}));


const Jobs = () => {


    const classes = useStyles();
    const [posts, setPosts] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [open, setOpen] = useState(false)


    useEffect(() => {
        loadAllJobs();
    }, [])


    const loadAllJobs = () => {
        setIsLoading(true);
        fetchAllPosts().then(response => {
            setPosts(response.data)
            console.log(posts)
        }).finally(() => {
            setIsLoading(false)
        })
    }

    const handleDeleteClick = (id) => {
        setIsLoading(true);

        // eslint-disable-next-line no-undef
        deletePost(id)
            .then(() => {
                loadAllJobs();
            })
    }

    return (

        // TODO: isskaidyti posts.title.includes(junior/mid/senior) ir padaryti radio buttonus searche


        <>
            {
                isLoading ?
                    <Loader/>
                    :
                    <div className={classes.jobs}>
                        <Typography variant="h3">
                            Total jobs: {posts.length}
                        </Typography>

                        <List>
                            {
                                posts.map(post => (
                                        <>
                                            <Paper className={classes.posts}>
                                                <ListItemAvatar>
                                                    <img alt="logo" className={classes.companyLogo} src={post.logoUrl}/>
                                                </ListItemAvatar>

                                                <div>
                                                    <Typography variant="h6">{post.title}</Typography>
                                                    <Typography variant="h5">{post.companyName}</Typography>
                                                    <Typography variant="h7"
                                                                color="textSecondary">{post.location}</Typography>
                                                    <div>
                                                        <Button className={classes.button}
                                                                onClick={() => setOpen(prevOpen => !prevOpen)}
                                                                variant="primary"
                                                        >
                                                            {open ? 'Hide Details' : 'View Details'}
                                                        </Button>
                                                        <Collapse in={open}>
                                                            <div>
                                                                <ReactMarkdown source={post.description}/>
                                                            </div>
                                                        </Collapse>
                                                    </div>
                                                </div>
                                                <div>
                                                    <Typography
                                                        color="textSecondary">Uploaded: {moment(post.createdAt).format('YYYY-DD-MM HH:MM')}</Typography>
                                                    <Chip label={post.type} color="default"/>
                                                </div>

                                            </Paper>

                                        </>
                                    )
                                )
                            }
                        </List>
                    </div>
            }
        </>

    )

}
export default Jobs