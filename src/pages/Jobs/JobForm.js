import React, {useEffect, useState} from 'react';
import {Button, Container, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {Formik, Form, Field, ErrorMessage} from "formik";
import {useHistory} from "react-router-dom"
import {addPost} from "../../api/postApi"
import {fetchAllCompanies} from "../../api/companyApi";
import Loader from "../../common/Loader";

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
    const [companies, setCompanies] = useState([])
    const [isLoading, setIsLoading] = useState(true)


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

    const loadAllCompanies = () => {
        setIsLoading(true);
        fetchAllCompanies().then(response => {
            setCompanies(response.data)
        }).finally(() => {
            setIsLoading(false)
        })
    }

    useEffect(() => {
        loadAllCompanies();
    }, [])

    const handleGoBack = () => {
        history.push("/jobs")
    }

    return (

        <>
            {
                isLoading ?
                    <Loader/>
                    :
                    <Formik
                        initialValues={{
                            companyId: "",
                            title: "",
                            type: "",
                            description: "",
                            summary: "",
                            location: "",
                            applyUrl: "",
                            logoUrl: "",

                        }}
                        onSubmit={handleOnSubmit}
                    >
                        {(props) => (

                            <Container className={classes.container} maxWidth="sm">
                                <Button className={classes.button} onClick={() => handleGoBack()}>Back</Button>
                                <Typography component="h1" variant="h5">Create new job post!</Typography>
                                <Form className={classes.form}>
                                    <Field component="select"
                                           options={companies}
                                           placeholder="Select company"
                                           name="companyId"
                                           multiple={false}>
                                        {
                                            companies.map(company => (

                                                <option key={company.id} value={company.id} name="company">
                                                    {company.companyName}
                                                </option>
                                            ))
                                        }
                                    </Field>

                                    <Field
                                        className={classes.field}
                                        name="title"
                                        autoComplete="title"
                                        placeholder="Title"
                                        multiline
                                        fullWidth
                                    />
                                    <Field
                                        className={classes.field}
                                        name="type"
                                        placeholder="Type"
                                        fullWidth
                                    />
                                    <Field component="textarea"
                                           className={classes.field}
                                           name="description"
                                           placeholder="Description"
                                           multiline
                                           fullWidth
                                    />
                                    <Field component="textarea"
                                           className={classes.field}
                                           name="summary"
                                           placeholder="Summary"
                                           multiline
                                           fullWidth
                                    />
                                    <Field
                                        className={classes.field}
                                        name="location"
                                        placeholder="Location"
                                        fullWidth
                                    />
                                    <Field
                                        className={classes.field}
                                        name="email"
                                        placeholder="Apply URL (email)"
                                        multiline
                                        fullWidth
                                    />
                                    {/*// TODO: change to file upload*/}
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
            }
        </>
    );
}

export default JobForm