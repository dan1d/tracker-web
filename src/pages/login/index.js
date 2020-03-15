import React, { useState } from "react"
import { Alert, Button, Col, Container, Form, Row, Spinner } from 'react-bootstrap'
import axios from '../../utils/http-common';
import { useSelector, useDispatch } from "react-redux";
import { LOGIN_STARTED, LOGIN_STARTED_SUCCESS, LOGIN_STARTED_ERROR } from "../../store/actionTypes";
import { SET_CURRENT_USER } from "../../store/actionTypes";
import {
  useHistory,
} from "react-router-dom";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const requesting = useSelector(state => state.users.requesting);
  const error = useSelector(state => state.users.error);
  const dispatch = useDispatch();
  const history = useHistory();

  function onSubmit(event) {
    event.preventDefault();
    event.stopPropagation();
    dispatch({type: LOGIN_STARTED})

    const data = {
      password,
      email
    };

    axios.post('/authenticate', data).then(
      (response) => {
        dispatch({type: SET_CURRENT_USER, payload: response.data});
        dispatch({type: LOGIN_STARTED_SUCCESS});
        history.push('/dashboard');
      }
    ).catch((err) => {
      dispatch({type: LOGIN_STARTED_ERROR, payload: { error: 'wrong credentials'}});
    })

  }

  const buttonDisabled = email.length === 0 || password.length === 0;

  return (
    <Container>
      <Row style={{marginTop: '100px'}}>
        <Col md={{ span: 6, offset: 3 }}>
          <Form onSubmit={onSubmit}>
          {error && error.length > 0 && <Alert key="error" variant="danger">
            Invalid Credentials
          </Alert>}
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>

            <Button variant="primary" type="submit" disabled={buttonDisabled || requesting}>
              Submit {requesting && <Spinner animation="grow" />}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginPage
