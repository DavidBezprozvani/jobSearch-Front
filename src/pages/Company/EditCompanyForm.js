import {ErrorMessage, Field, Form, Formik} from "formik";
import {Button, Container, Typography} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import {addCompany, fetchSingleCompany, updateCompany} from "../../api/companyApi";
import * as Yup from "yup";
import {makeStyles} from '@material-ui/core/styles';
import {useHistory} from "react-router-dom"
import {useParams} from "react-router";
import {fetchSinglePost} from "../../api/postApi";

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

    error: {
        color: "#ff0000c7",
    }

}));



const EditCompanyForm = () => {
    const classes = useStyles()
    const history = useHistory()
    const [company, setCompany] = useState([])
    let { id } = useParams()


    const handleOnSubmit = (formValues, formikHelpers) => {
        formikHelpers.setSubmitting(true)
        updateCompany(id, formValues)
            .then(res => {
                history.push("/companies");
            })
            .finally(() => {
                formikHelpers.setSubmitting(false)
            })
    }

    useEffect(() => {
        fetchSingleCompany(id)
            .then(response => {
                setCompany(response.data);
            }).finally(() => {
        })
    }, [])



    const validationSchema = Yup.object({
        companyName: Yup
            .string()
            .required("Company name is required"),
        registrationCode: Yup
            .number()
            .positive()
            .min(3, 'Registration code is too short')
            .required('Registration code is required'),
        address: Yup
            .string()
            .required('Adress is required'),
        logoUrl: Yup
            .string()
            .required('Company logo url is required'),

    });

return (

    <>

        <Formik
            initialValues={{
                companyName: company.companyName,
                registrationCode: company.registrationCode,
                address: company.address,
                logoUrl: company.logoUrl,
                companyUrl: company.companyUrl,
            }}
            onSubmit={handleOnSubmit}
            validationSchema = {validationSchema}
        >
            {(props) => (

                <Container className={classes.container} maxWidth="sm">
                    <Button className={classes.button} onClick={() => handleGoBack()}>Back</Button>
                    <Typography className={classes.title} component="h1" variant="h5">let's go</Typography>
                    <Form className={classes.form}>
                        <Field
                            className={classes.field}
                            name="companyName"
                            autoComplete="companyName"
                            placeholder="Company name"
                            fullWidth
                        />
                        <ErrorMessage name="companyName"
                                      className={classes.error}
                                      component="small"/>
                        <Field
                            className={classes.field}
                            name="registrationCode"
                            autoComplete="registrationCode"
                            placeholder="Registration Code"
                            fullWidth
                        />
                        <ErrorMessage name="registrationCode"
                                      className={classes.error}
                                      component="small"/>
                        <Field
                            className={classes.field}
                            name="address"
                            placeholder="Address"
                            fullWidth
                        />
                        <ErrorMessage name="address"
                                      className={classes.error}
                                      component="small"/>
                        <Field
                            className={classes.field}
                            placeholder="Logo URL"
                            name="logoUrl"
                            fullWidth
                        />
                        <ErrorMessage name="logoUrl"
                                      className={classes.error}
                                      component="small"/>
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

export default EditCompanyForm
