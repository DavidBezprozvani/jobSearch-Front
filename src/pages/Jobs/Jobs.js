import React from 'react';
import {useEffect, useState} from 'react'
import {fetchAllPosts, deletePost} from "../../api/postApi";
import {Link} from "react-router-dom";
import moment from 'moment'
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import EditIcon from '@material-ui/icons/Edit';
import {
    makeStyles,
    Typography,
    List,
    Button,
    ListItemAvatar,
    Paper,
    Chip,
    Collapse,
    Container
} from "@material-ui/core";
import Loader from "../../common/Loader";
import useUser from "../../hooks/useUser";
import { useTranslation } from "react-i18next";


const useStyles = makeStyles(() => ({

    posts: {
        textDecoration: "none",
        margin: "10px 20px",
        padding: "20px 20px",
        display: "flex",


    },
    jobs: {
        marginTop: "40px",
        display: "list-item",
        alignContent: "space-between",
        alignItems: "space-between",

    },

    chip: {
        background: "#4d576a",
        color: "white",
        marginTop: "5px"
    },

    companyLogo: {
        width: "100px",
        height: "100px",
        borderRadius: "10px",
        marginRight: "30px",
    },

    button: {
        background: "#3d69be",
        margin: "10px 0",
        color: "white",
        fontSize: "14px",
        textDecoration: "none",
        borderRadius: "15px",
        borderStyle: "solid",
        paddingLeft: "35px",
        paddingRight: "35px",
        '&:hover': {
            opacity: "0.9",
            background: "#3d69be",
        }
    },

    link: {
        textDecoration: "none",
        color: "black",
        '&:hover': {
            textDecoration: "underline",
            opacity: "0.9",
            color: "#3d69be",
        }
    },

    icon: {
        float: "right",
        '&:hover': {
            opacity: "0.8",
            cursor: "pointer",
        }
    }
}));


const Jobs = () => {


    const classes = useStyles();
    const [posts, setPosts] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [open, setOpen] = useState([])
    const user = useUser()
    const { t } = useTranslation('jobs')


    useEffect(() => {
        loadAllJobs();
    }, [])


    const loadAllJobs = () => {
        setIsLoading(true);
        fetchAllPosts().then(response => {
            setPosts(response.data)
        }).finally(() => {
            setIsLoading(false)
        })
    }

    const handleDeleteClick = (id) => {
        setIsLoading(true);

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

                    <Container className={classes.jobs}>
                        <Typography variant="h3">
                            { t ('totalJobs', { total: posts.length })}
                        </Typography>
                        <Link to="/jobs/new" className={classes.link}>
                            <Button type="button" className={classes.button}>Create new post</Button>
                        </Link>
                        <List>
                            {
                                posts.map(post => (

                                            <Paper className={classes.posts} key={post.id}>
                                                <ListItemAvatar>
                                                    <img alt="logo" className={classes.companyLogo} src={post.logoUrl}/>
                                                </ListItemAvatar>

                                                <div>
                                                    <Link className={classes.link} to={`/jobs/${post.id}`}>
                                                    <Typography  variant="h6">{post.title}</Typography>
                                                    </Link>
                                                    <Typography variant="h5">{post.companyName}</Typography>
                                                    <Typography variant="h6"
                                                                color="textSecondary">{post.location}</Typography>
                                                    <div>
                                                        <Button className={classes.button}
                                                                onClick={() => {
                                                                    if (open.includes(post.id)) {
                                                                        setOpen(open.filter(id => id !== post.id))
                                                                    } else {
                                                                        setOpen([...open, post.id])
                                                                    }
                                                                }}
                                                        >
                                                            {open.includes(post.id) ? 'Hide Details' : 'View Details'}
                                                        </Button>
                                                        <Collapse in={open.includes(post.id)}>
                                                            <div>
                                                                <Typography variant="h6">{post.summary}</Typography>
                                                            </div>
                                                        </Collapse>
                                                    </div>
                                                </div>
                                                <div>
                                                    {
                                                        user?.roles.includes('ADMIN') && (
                                                            <HighlightOffIcon color="error" className={classes.icon}
                                                                              onClick={() => handleDeleteClick(post.id)}/>

                                                        )

                                                    }
                                                    {
                                                        user?.roles.includes('ADMIN') && (
                                                            <EditIcon color="primary" className={classes.icon}
                                                                              // onClick={() => handleEditClick(post.id)}
                                                            />

                                                        )

                                                    }


                                                    <Typography color="textSecondary">Uploaded: {moment(post.createdAt).format('YYYY-DD-MM HH:MM')}</Typography>
                                                    <Chip label={post.type} className={classes.chip}/>
                                                </div>
                                            </Paper>

                                    )
                                )
                            }
                        </List>

                    </Container>
            }
        </>

    )

}
export default Jobs