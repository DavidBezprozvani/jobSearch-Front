import React from 'react';
import {Button, Container, Link, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from "yup";
import {useHistory} from "react-router-dom"
import {saveUser} from "../../api/usersApi"


const useStyles = makeStyles((theme) => ({


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
        background: "inherit",
        border: "0",
        outline: "0",
        borderBottom: "2px solid #3d69be",
        '&:focus': {
            boxShadow: "0 0 5px #3d69be",
            padding: "10px 10px",
            borderBottom: "1px solid #3d69be",
            opacity: "0.9",
        },
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

    title: {
        display: "flex",
        justifyContent: "center",
    },

    error: {
        color: "#ff0000c7",
    }
}));

const Registration = () => {
    const classes = useStyles()
    const history = useHistory()

    const handleOnSubmit = (formValues, formikHelpers) => {
        formikHelpers.setSubmitting(true)
        saveUser(formValues)
            .then(res => {
                history.push("/login");
            })
            .finally(() => {
                formikHelpers.setSubmitting(false)
            })
    }


    const validationSchema = Yup.object({
        username: Yup
            .string()
            .min(4, "Minimum 4 characters")
            .max(10, "Max 10 characters")
            .required("Username is required"),
        password: Yup
            .string()
            .min(3, 'Minimum 3 characters')
            .required('Password is required'),
        name: Yup
            .string()
            .required('Name is required'),
        surname: Yup
            .string()
            .required('Surname is required'),
        email: Yup
            .string()
            .email('Enter a valid email')
            .required('Email is required'),

    });

    return (
        <Formik
            initialValues={{
                username: "",
                password: "",
                name: "",
                surname: "",
                email: "",
            }}
            onSubmit={handleOnSubmit}
            validationSchema = {validationSchema}
        >
            {(props) => (
                <Container className={classes.container} maxWidth="sm">
                    <Typography className={classes.title} component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Form className={classes.form} noValidate>
                        <Field
                            className={classes.field}
                            placeholder="Enter your username"
                            name="username"
                            autoComplete="username"
                        />
                        <ErrorMessage name="username"
                                      className={classes.error}
                                      component="small"/>
                        <Field
                            className={classes.field}
                            placeholder="Enter your first name"
                            name="name"
                            autoComplete="name"
                        />
                        <ErrorMessage name="name"
                                      className={classes.error}
                                      component="small"/>
                        <Field
                            className={classes.field}
                            placeholder="Enter your last name"
                            name="surname"
                            autoComplete="surname"
                        />
                        <ErrorMessage name="surname"
                                      className={classes.error}
                                      component="small"/>
                        <Field
                            className={classes.field}
                            placeholder="Enter your email"
                            name="email"
                            autoComplete="email"
                        />
                        <ErrorMessage name="email"
                                      className={classes.error}
                                      component="small"/>
                        <Field
                            className={classes.field}
                            name="password"
                            placeholder="Enter password"
                            type="password"
                            id="password"
                        />
                        <ErrorMessage name="password"
                                      className={classes.error}
                                      component="small"/>
                        <Button
                            type="submit"
                            className={classes.submit}
                            disabled={props.isSubmitting}
                        >
                            Sign Up
                        </Button>

                        <Link to="/login" variant="body2">
                            Already have an account? Sign in
                        </Link>
                    </Form>
                </Container>
            )}
        </Formik>
    );
}

export default Registration