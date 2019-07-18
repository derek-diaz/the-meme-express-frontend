import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";

//Components
import Header from "./components/header"
import Home from "./routes/home"
import Login from "./routes/login";
import Register from "./routes/register";
import Intro from "./routes/intro";
import Favorites from "./routes/favorites";

function App() {
  return (
      <Router>
          <div>
              <Header />
              <Route exact path="/" component={Intro} />
              <Route path="/home" component={Home} />
              <Route path="/login" component={Login}/>
              <Route path="/register" component={Register} />
              <Route path="/favorites" component={Favorites} />
          </div>
      </Router>
  );
}

export default App;
