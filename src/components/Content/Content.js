import React from "react";
import {Switch, Route} from "react-router-dom"
import Login from "../../pages/Login/Login";
import LandingPage from "../../pages/LandingPage/LandingPage";
import About from "../../pages/About/About";
import Jobs from "../../pages/Jobs/Jobs";
import NotFound from "../../pages/NotFound/NotFound";


export default () => (
    <main className="container">
        <Switch>
            <Route exact path="/">
                <LandingPage/>
            </Route>
            <Route path="/jobs">
                <Jobs/>
            </Route>
            <Route path="/about">
                <About/>
            </Route>
            <Route>
                <Login/>
            </Route>
            <Route path="*">
                <NotFound/>
            </Route>
        </Switch>
    </main>
)