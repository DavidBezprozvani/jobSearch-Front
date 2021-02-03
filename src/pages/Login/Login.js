import React from 'react';
import {Button, FormControlLabel, Checkbox, Link, Grid, Typography, makeStyles} from '@material-ui/core';
import {Formik, Form, ErrorMessage, Field} from "formik";
import * as Yup from "yup"
import {useHistory, useLocation} from "react-router-dom"
import {useDispatch} from "react-redux";
import {login} from "../../api/usersApi"
import {setJwt, setUserData} from "../../store/slices/userSlice";

const useStyles = makeStyles((theme) => ({


    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
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

    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: "20px 100px",

    },

    field: {
        padding: "20px 100px",
        marginTop: "10px",
        fontSize: "15px",
        textAlign: "left",
        border: "0",
        outline: "0",
        borderBottom: "2px solid #3d69be",
        '&:focus': {
            boxShadow: "0 0 5px #3d69be",
            padding: "20px 100px",
            borderBottom: "1px solid #3d69be",
            opacity: "0.9",

        }
    }
}));

const Login = () => {

    const classes = useStyles();
    const history = useHistory()
    const location = useLocation();
    const dispatch = useDispatch()

    const { from } = location.state || {
        from: {
            pathname: '/'
        }
    }

    const handleLogin = (loginData, {setSubmitting}) => {
        setSubmitting(true)

        login(loginData)
            .then(({data, headers: {authorization}}) => {
                dispatch(setUserData(data))
                dispatch(setJwt(authorization))

                history.push(from)
            })
            .finally(() => setSubmitting(false))

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
                        <div className={classes.paper}>
                            <Typography component="h1" variant="h5">Sign in</Typography>
                            <Form className={classes.form}>
                                <Field
                                    className={classes.field}
                                    placeholder="Please enter username"
                                    label="Username"
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
                                    variant="contained"
                                    className={classes.submit}
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
                        </div>
            </>
            )}
        </Formik>

    );
}

export default Login
