import React from 'react';
import {Button, FormControlLabel, Checkbox, Link, Grid, Typography, makeStyles, Container} from '@material-ui/core';
import {Formik, Form, ErrorMessage, Field} from "formik";
import * as Yup from "yup"
import {useHistory} from "react-router-dom"
import {useDispatch} from "react-redux";
import {login} from "../../api/usersApi"
import {setJwt, setUserData} from "../../store/slices/userSlice";

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
        },
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

const Login = () => {

    const classes = useStyles();
    const history = useHistory()
    const dispatch = useDispatch()


    const handleLogin = (loginData, {setSubmitting}) => {
        setSubmitting(true)

        login(loginData)
            .then(({data, headers: {authorization}}) => {
                dispatch(setUserData(data))
                dispatch(setJwt(authorization))

                history.push("/")
            })
            .catch(() => setSubmitting(false))
    }



    const validationSchema = Yup.object({
        username: Yup
            .string()
            .required("Username is required"),
        password: Yup
            .string('Enter your password')
            .min(8, 'Password should be of minimum 8 characters length')
            .required('Password is required'),
    });

    return (

        <Formik
            initialValues={{
                username: "",
                password: "",
                // validationSchema: {validationSchema},
            }}
            onSubmit={handleLogin}
        >
            {(props) => (

            <>
                <Container className={classes.container} maxWidth="sm">
                            <Typography className={classes.title} component="h1" variant="h5">Sign in</Typography>
                            <Form className={classes.form}>
                                <Field
                                    className={classes.field}
                                    placeholder="Please enter username"
                                    name="username"
                                    autoComplete="username"
                                    autoFocus
                                />
                                <ErrorMessage name="username"
                                              className="form-text text-danger"
                                              component="small"/>
                                <Field
                                    className={classes.field}
                                    name="password"
                                    label="Password"
                                    placeholder="Please enter password"
                                    type="password"
                                    id="password"
                                />
                                <ErrorMessage name="password"
                                              className="form-text text-danger"
                                              component="small"/>
                                <FormControlLabel
                                    control={<Checkbox value="remember" color="primary"/>}
                                    label="Remember me"
                                />
                                <Button
                                    type="submit"
                                    fullWidth
                                    className={classes.button}
                                    disabled={props.isSubmitting}
                                >
                                    Sign In
                                </Button>
                                <Grid container>
                                    <Grid item xs>
                                        <Link href="#" variant="body2">
                                            Forgot password?
                                        </Link>
                                    </Grid>
                                    <Grid item>
                                        <Link to="/registration" variant="body2">
                                            Don't have an account? Sign Up
                                        </Link>
                                    </Grid>
                                </Grid>
                            </Form>
                </Container>
            </>
            )}
        </Formik>

    );
}

export default Login
