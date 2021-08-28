import React from "react";
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Navigation from "components/Navigation";
import Profile from "routes/Profile";

const AppRouter = ({ isLoggedIn }) => {
  return (
    <Router>
      {isLoggedIn && <Navigation />}
      <Switch>
        <Route exact path="/">
          {isLoggedIn ? <Home /> : <Auth />}
          {/* <Redirect from="*" to="/" /> */}
        </Route>
        <Route exact path="/profile">
          {isLoggedIn ? <Profile /> : null}
          {/* <Redirect from="*" to="/" /> */}
        </Route>
      </Switch>
    </Router>
  );
};
export default AppRouter;
