/**
 * App
 *
 * @file   App.js
 * @author Derek Diaz Correa
 * @since  7.17.2019
 */
import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";

//Components
import Header from "./components/header"
import Home from "./routes/home"
import Login from "./routes/login";
import Register from "./routes/register";
import Intro from "./routes/intro";
import Favorites from "./routes/favorites";

export default function App() {
    return (
        <Router>
            <div>
                <Header/>
                <Route exact path="/" component={Intro}/>
                <Route path="/home" component={Home}/>
                <Route path="/login" component={Login}/>
                <Route path="/register" component={Register}/>
                <Route path="/favorites" component={Favorites}/>
            </div>
        </Router>
    );
}

