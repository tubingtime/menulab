import React, { Fragment, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import Dashboard from './components/Dashboard';
import Register from './components/Register';
import Login from './components/Login';
import Menus from './components/Menus';
import Items from './components/Items';
import Home from './components/Home';

toast.configure();

function App() {

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const setAuth = (boolean) => {
        setIsAuthenticated(boolean);
    };

    async function isAuth() {
        try {
            const response = await fetch("http://localhost:5000/auth/verify", {
                method: "GET",
                headers: { token: localStorage.token }

            });
            console.log(localStorage.token);
            const parseRes = await response.json();

            parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);

        } catch (err) {
            console.error(err.message);
        }
    }

    useEffect(() => {
        isAuth()
    }, []);

    console.log(isAuthenticated);

    return (
        <Fragment>
            <Router>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/login" render={props => !isAuthenticated ? (<Login {...props} setAuth={setAuth} />) : (<Redirect to="/dashboard" />)} />
                    <Route exact path="/register" render={props => !isAuthenticated ? (<Register {...props} setAuth={setAuth} />) : (<Redirect to="/login" />)} />
                    <Route exact path="/menus" render={props => isAuthenticated ? (<Menus {...props} setAuth={setAuth} />) : (<Redirect to="/menus" />)} />
                    <Route exact path="/items" render={props => isAuthenticated ? (<Items {...props} setAuth={setAuth} />) : (<Redirect to="/items" />)} />
                    <Route exact path="/dashboard" render={props => isAuthenticated ? (<Dashboard {...props} setAuth={setAuth} />) : (<Redirect to="/login" />)} />
                </Switch>
            </Router>
        </Fragment>
    );
};

export default App;
