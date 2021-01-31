import React from 'react';
import {Button, TextField, FormControlLabel, Checkbox, Link, Grid, Typography, Container} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {Formik, Form, ErrorMessage} from "formik";
import * as Yup from "yup"
import {useHistory, useLocation} from "react-router-dom"
import {useDispatch} from "react-redux";
import {login} from "../../api/usersApi"
import {setJwt, setUserData} from "../../store/userSlice";
import Content from "../../components/Content/Content";

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
}));

const Login = () => {

    // const dispatch = useDispatch()
    //
    //
    // const postLogin = (loginData, {setSubmitting}) => {
    //     setSubmitting(true)
    //
    //     login(loginData)
    //         .then(({data, headers: {authorization}}) => {
    //             dispatch(setUserData(data))
    //             dispatch(setJwt(authorization))
    //
    //         })
    //         .finally(() => setSubmitting(false))
    //
    //
    // }

    const classes = useStyles();

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
                password: ""
            }}
            // onSubmit={postLogin}
        >
            {/*{(props) => (*/}

            <>
                <Form>
                    <Container component="main" maxWidth="xs">
                        <div className={classes.paper}>
                            <Typography component="h1" variant="h5">Sign in</Typography>
                            <form className={classes.form}>
                                <TextField
                                    margin="normal"
                                    // required
                                    fullWidth
                                    id="username"
                                    label="Username"
                                    name="username"
                                    autoComplete="username"
                                    autoFocus
                                />
                                <ErrorMessage name="username"
                                              className="form-text text-danger"
                                              component="small"/>
                                <TextField
                                    margin="normal"
                                    // required
                                    fullWidth
                                    name="password"
                                    label="Password"
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
                                    // disabled={props.isSubmitting}
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
                            </form>
                        </div>
                    </Container>
                </Form>
            </>
            {/*)}*/}
        </Formik>

    );
}

export default Login
