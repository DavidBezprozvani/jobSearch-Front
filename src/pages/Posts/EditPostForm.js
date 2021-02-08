import React, {useEffect, useState} from 'react'
import {useParams} from "react-router";
import {useHistory} from "react-router-dom"
import {Field, Form, Formik} from "formik";
import {fetchSinglePost, updatePost} from "../../api/postApi";
import {Button, Container, Typography, makeStyles} from "@material-ui/core";
import {fetchAllCompanies} from "../../api/companyApi";
import Loader from "../../common/Loader";

const useStyles = makeStyles({

    container: {
        marginTop: "100px",
    },

    form: {
        display: 'flex',
        flexDirection: "column",
        flexFlow: "row wrap",

    },

    field: {
        padding: "5px 5px",
        marginTop: "15px",
        fontSize: "18px",
        flexDirection: "column",
        color: "inherit",
        border: "0",
        outline: "0",
        borderBottom: "2px solid #3d69be",
        '&:focus': {
            boxShadow: "0 0 5px #3d69be",
            padding: "10px 10px",
            borderBottom: "1px solid #3d69be",
            opacity: "0.9",
        }
    },

    button: {
        background: "#3d69be",
        margin: "30px 0",
        color: "white",
        fontSize: "14px",
        textDecoration: "none",
        borderRadius: "15px",
        borderStyle: "solid",
        paddingLeft: "15px",
        paddingRight: "15px",
        '&:hover': {
            opacity: "0.9",
            background: "#3d69be",
        }
    },

    title: {
        display: "flex",
        justifyContent: "center",
    },

})


const EditPostForm = () => {


    const classes = useStyles();
    const history = useHistory();
    const [post, setPost] = useState(null)

    const {id} = useParams()


    useEffect(() => {
        fetchSinglePost(id)
            .then(response => {
                setPost(response.data);
            })
    }, [])


    const handleOnSubmit = (formValues, formikHelpers) => {
        formikHelpers.setSubmitting(true)
        updatePost(id, formValues)
            .then((response) => {
                history.push("/jobs")
            })
            .finally(() => formikHelpers.setSubmitting(false))
    }

    const handleGoBack = () => {
        history.push("/jobs")
    }

    return (


        <>
            {
                    post &&
                    <Formik
                        initialValues={{
                            companyId: post.companyId,
                            id: post.id,
                            title: post.title,
                            type: post.type,
                            description: post.description,
                            createdAt: post.createdAt,
                            summary: post.summary,
                            location: post.location,
                            applyUrl: post.applyUrl,
                            logoUrl: post.logoUrl
                        }}
                        onSubmit={handleOnSubmit}>
                        {(props) => (

                            <Container className={classes.container} maxWidth="sm">
                                <Button className={classes.button} onClick={() => handleGoBack()}>Back</Button>
                                <Typography component="h1" variant="h5">Edit your post!</Typography>
                                <Form className={classes.form}>

                                    <Field
                                        className={classes.field}
                                        name="title"
                                        autoComplete="title"
                                        placeholder={post.title}
                                        multiline
                                    />
                                    <Field
                                        className={classes.field}
                                        name="type"
                                        placeholder={post.type}
                                    />
                                    <Field
                                        component="textarea"
                                        className={classes.field}
                                        name="description"
                                        placeholder={post.description}
                                        multiline
                                    />
                                    <Field
                                        component="textarea"
                                        className={classes.field}
                                        name="summary"
                                        placeholder={post.summary}
                                        multiline
                                    />
                                    <Field
                                        className={classes.field}
                                        name="location"
                                        placeholder={post.location}
                                    />
                                    <Field
                                        className={classes.field}
                                        name="applyUrl"
                                        placeholder={post.applyUrl}
                                    />

                                    <Button
                                        type="submit"
                                        fullWidth
                                        disabled={props.isSubmitting}
                                        className={classes.button}
                                    >
                                        EDIT
                                    </Button>

                                </Form>
                            </Container>
                        )}

                    </Formik>
            }
        </>
    )
}

export default EditPostForm