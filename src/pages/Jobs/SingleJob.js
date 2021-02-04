import React from "react";
import {useHistory, useParams} from "react-router-dom";
import {makeStyles} from '@material-ui/core/styles';
import {CardContent, Button, Typography, Card} from '@material-ui/core';
import {useEffect, useState} from "react";
import {fetchSinglePost} from "../../api/postApi";
import Loader from "../../common/Loader";


export default () => {

    const useStyles = makeStyles({
        root: {
            minWidth: 50,
            margin: 50,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
        },
        title: {
            fontSize: 14,
            textAlign: "center"
        },
        textCenter: {
            textAlign: "center"
        },
        button: {
            margin: 15,
        }
    });

    const {id} = useParams();
    const history = useHistory();
    // const {isLoading, setIsLoading} = useState(true)
    const [post, setPost] = useState(null);
    const classes = useStyles();


    const handleGoBack = () => {
        history.push("/jobs")
    }


    useEffect(() => {
        fetchSinglePost(id)
            .then(response => {
                setPost(response.data);
            })
            .finally(() => {
                // setIsLoading(false);
            });
    }, [])


    return (
        <>
            <Button className={classes.button} onClick={() => handleGoBack()}>Back</Button>
            {post && (

                <Card className={classes.root} variant="outlined">
                    <CardContent>
                        <Typography className={classes.title} variant="body2" component="p">
                            {post.companyName}
                        </Typography>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                            {post.title}
                        </Typography>
                        <Typography className={classes.textCenter} variant="body2" component="p">
                            {post.description}
                        </Typography>
                    </CardContent>
                </Card>
            )
            }
        </>
    )
}

