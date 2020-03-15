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
import TimeSheets from "../pages/TimeSheets";

export default function Routes() {
  const current_user = useSelector(state => state.users.current_user);

  return (
    <Router>
      <Container>
        <Switch>
          <Route path="/login">
            <LoginPage />
          </Route>
          <PrivateRoute path="/dashboard">
            <Dashboard />
          </PrivateRoute>

          <PrivateRoute path="/timesheets" >
            <TimeSheets />
          </PrivateRoute>
        </Switch>
      </Container>
    </Router>
  );
}

function PrivateRoute({ children, ...rest }) {
  const current_user = useSelector(state => state.users.current_user);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const redirectTo = location => <Redirect to={{ pathname: "/login", state: { from: location } }} />
  const history = useHistory();
  const route = <Route
      {...rest}
      render={({ location }) =>
        current_user.email ? (
          <React.Fragment>
            <TopBar />
            {children}
          </React.Fragment>

        ) : (redirectTo(location))
      }
    />

    useEffect(() => {
      if(!current_user.email) {
        ajax.get('/users/self').then(
          (response) => {
            dispatch({type: SET_CURRENT_USER, payload: response.data});
            setLoading(false)
          }
        ).catch(err => {
          history.push('/login');
        });
      }
    }, [current_user, history, dispatch])

    if(current_user.email) {
      return route
    }

    console.log(current_user.email, 'current_user.email')
    if(loading || !current_user.email) {
      console.log('perdiste')
      return <Spinner />
    } else {
      console.log('hahahax')
      return route;
    }
}