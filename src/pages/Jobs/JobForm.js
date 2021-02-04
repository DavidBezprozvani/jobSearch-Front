import React from 'react';
import {Button, TextField, Container, TextareaAutosize, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {Formik, Form, Field, ErrorMessage} from "formik";
import {useHistory} from "react-router-dom"
import {addPost} from "../../api/postApi"

const useStyles = makeStyles((theme) => ({

    container: {
        marginTop: "10px",
    },

    submit: {
        margin: theme.spacing(3, 0, 2),
        background: "#3d69be",
        color: "white",
        '&:hover': {
            opacity: "0.9",
            background: "#3d69be",
        }
    },
}));

const JobForm = () => {
    const classes = useStyles()
    const history = useHistory()


    const handleOnSubmit = (formValues, formikHelpers) => {
        formikHelpers.setSubmitting(true)
        addPost(formValues)
            .then(res => {
                history.push("/jobs");
            })
            .finally(() => {
                formikHelpers.setSubmitting(false)
            })
    }


    return (

        <>
            <Formik
                initialValues={{
                    title: "",
                    type: "",
                    companyName: "",
                    description: "",
                    summary: "",
                    location: "",
                    applyUrl: "",
                    companyUrl: "",
                    logoUrl: "",

                }}
                onSubmit={handleOnSubmit}
            >
                {(props) => (

                    <Container className={classes.container} maxWidth="sm">
                        <Typography component="h1" variant="h5">Create new job post!</Typography>
                    <Form className={classes.form}>
                        <TextField
                            name="title"
                            autoComplete="title"
                            label="Title"
                            multiline
                            fullWidth
                        />
                        <TextField
                            name="type"
                            label="Type"
                            fullWidth
                        />
                        <TextField
                            label="Description"
                            name="description"
                            multiline
                            fullWidth
                        />
                        <TextField
                            name="summary"
                            label="Summary"
                            multiline
                            fullWidth
                        />
                        <TextField
                            name="location"
                            label="Location"
                            fullWidth
                        />
                        <TextField
                            name="applyUrl"
                            label="Apply Url"
                            multiline
                            fullWidth
                        />
                        <TextField
                            name="companyUrl"
                            label="Company website"
                            multiline
                            fullWidth
                        />
                        {/*// TODO: change to file upload*/}
                        <TextField
                            name="logoUrl"
                            label="Logo Url"
                            multiline
                            fullWidth
                        />
                        <Button
                            type="submit"
                            fullWidth
                            disabled={props.isSubmitting}
                        >
                            Sign Up
                        </Button>
                    </Form>
                    </Container>
                    )}
            </Formik>
        </>
    );
}

export default JobForm