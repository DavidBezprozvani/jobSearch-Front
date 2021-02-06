import React from 'react';
import {Button, Container, Link, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {Formik, Form, Field} from "formik";
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
        padding: "5px 10px",
        marginTop: "15px",
        fontSize: "18px",
        flexDirection: "column",

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
    }
}));

const Registration = () => {
    const classes = useStyles()
    const history = useHistory()




    const handleOnSubmit = (formValues, formikHelpers) => {
        formikHelpers.setSubmitting(true)
        saveUser(formValues)
            .then(res => {
                history.push("/");
            })
            .finally(() => {
                formikHelpers.setSubmitting(false)
            })
    }


    const validationSchema = Yup.object({
        username: Yup
            .string()
            .required("Enter your username"),
        email: Yup
            .string('Enter your email')
            .email('Enter a valid email')
            .required('Email is required'),
        password: Yup
            .string('Enter your password')
            .min(3, 'Password should be of minimum 3 characters length')
            .required('Password is required'),
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
                                        autoFocus
                                    />
                                    <Field
                                        className={classes.field}
                                        placeholder="Enter your first name"
                                        name="name"
                                        autoComplete="name"
                                        autoFocus
                                    />
                                    <Field
                                        className={classes.field}
                                        placeholder="Enter your last name"
                                        name="surname"
                                        autoComplete="surname"
                                        autoFocus
                                    />
                                    <Field
                                        className={classes.field}
                                        placeholder="Enter your email"
                                        name="email"
                                        autoComplete="email"
                                        autoFocus
                                    />
                                    <Field
                                        className={classes.field}
                                        name="password"
                                        placeholder="Enter password"
                                        type="password"
                                        id="password"
                                    />
                            <Button
                                type="submit"
                                // fullWidth
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