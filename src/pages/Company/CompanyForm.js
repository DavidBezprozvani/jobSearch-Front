import React from 'react';
import {Button,  Container, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {Formik, Form, Field} from "formik";
import {useHistory} from "react-router-dom"
import {addCompany} from "../../api/companyApi"

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
    }
}));

const CompanyForm = () => {
    const classes = useStyles()
    const history = useHistory()


    const handleOnSubmit = (formValues, formikHelpers) => {
        formikHelpers.setSubmitting(true)
        addCompany(formValues)
            .then(res => {
                history.push("/companies");
            })
            .finally(() => {
                formikHelpers.setSubmitting(false)
            })
    }

    const handleGoBack = () => {
        history.push("/companies")
    }


    return (

        <>

            <Formik
                initialValues={{
                    companyName: "",
                    registrationCode: "",
                    address: "",
                    logoUrl: "",
                    companyUrl: ""
                }}
                onSubmit={handleOnSubmit}
            >
                {(props) => (

                    <Container className={classes.container} maxWidth="sm">
                        <Button className={classes.button} onClick={() => handleGoBack()}>Back</Button>
                        <Typography className={classes.title} component="h1" variant="h5">Create new job post!</Typography>
                        <Form className={classes.form}>
                            <Field
                                className={classes.field}
                                name="companyName"
                                autoComplete="companyName"
                                placeholder="Company name"
                                fullWidth
                            />
                            <Field
                                className={classes.field}
                                name="registrationCode"
                                autoComplete="registrationCode"
                                placeholder="Registration Code"
                                fullWidth
                            />
                            <Field
                                className={classes.field}
                                name="address"
                                placeholder="Address"
                                fullWidth
                            />
                            <Field
                                className={classes.field}
                                placeholder="Logo URL"
                                name="logoUrl"
                                fullWidth
                            />
                            <Field
                                className={classes.field}
                                placeholder="Company URL"
                                name="companyUrl"
                                label="Company URL"
                                fullWidth
                            />
                            <Button
                                type="submit"
                                fullWidth
                                disabled={props.isSubmitting}
                                className={classes.button}
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

export default CompanyForm