import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useHistory
} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import LoginPage from '../pages/login';
import TopBar from "./TopBar";
import { Container, Row, Spinner } from 'react-bootstrap';
import ajax from '../utils/http-common';
import { useDispatch, useSelector } from "react-redux";
import { SET_CURRENT_USER } from "../store/actionTypes";
import Dashboard from "../pages/dashboard";

export default function Routes() {

  return (
    <Router>
      <Container>
        <Switch>
          <Route path="/login">
            <LoginPage />
          </Route>
          <PrivateRoute path="/dashboard">
            <TopBar />
            <Dashboard />
          </PrivateRoute>
        </Switch>
      </Container>
    </Router>
  );
}

function PrivateRoute({ children, ...rest }) {
  const user = useSelector(state => state.users.user);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const redirectTo = location => <Redirect to={{ pathname: "/login", state: { from: location } }} />
  const route = <Route
      {...rest}
      render={({ location }) =>
        user ? (
          children
        ) : (redirectTo(location))
      }
    />

    useEffect(() => {
      ajax.get('/users/self').then(
        (response) => {
          dispatch({type: SET_CURRENT_USER, payload: response.data});
          setLoading(false)
        }
      ).catch(err => {
        setLoading(false)
      })
    }, [setLoading, dispatch])

    if(user) {
      return route
    }

    if(loading) {
      return <Spinner />
    } else {
      return route;
    }
}