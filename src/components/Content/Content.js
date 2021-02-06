import React from "react";
import {Switch, Route} from "react-router-dom"
import Login from "../../pages/Login/Login";
import LandingPage from "../../pages/LandingPage/LandingPage";
import About from "../../pages/About/About";
import Jobs from "../../pages/Jobs/Jobs";
import NotFound from "../../pages/NotFound/NotFound";
import Registration from "../../pages/Registration/Registration";
import UserList from "../../pages/Users/UserList";
import CompanyList from "../../pages/Company/CompanyList";
import JobForm from "../../pages/Jobs/JobForm";
import SingleJob from "../../pages/Jobs/SingleJob";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import CompanyForm from "../../pages/Company/CompanyForm";


const Content = () => (
    <main className="container">
        <Switch>
            <Route exact path="/">
                <LandingPage/>
            </Route>
            <Route exact path="/jobs">
                <Jobs/>
            </Route>
            <PrivateRoute path="/jobs/new" roles={['ADMIN', 'USER']}>
                <JobForm/>
            </PrivateRoute>
            <Route path="/jobs/:id">
                <SingleJob/>
            </Route>
            <PrivateRoute path="/users" roles={['ADMIN']}>
                <UserList/>
            </PrivateRoute>
            <Route exact path="/companies">
                <CompanyList/>
            </Route>
            <PrivateRoute path="/companies/new" roles={['ADMIN', 'USER']}>
                <CompanyForm/>
            </PrivateRoute>
            <Route path="/registration">
                <Registration/>
            </Route>
            <Route path="/login">
                <Login/>
            </Route>
            <Route path="/about">
                <About/>
            </Route>
            <Route path="*">
                <NotFound/>
            </Route>
        </Switch>
    </main>
)
export default Content