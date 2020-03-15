import React, { useState, useEffect } from "react"
import { Table, Container, Row } from 'react-bootstrap'
import ajax from '../../utils/http-common';
import { useSelector, useDispatch } from "react-redux";
import { FETCH_TIME_SHEETS_STARTED, FETCH_TIME_SHEETS_SUCCESS, FETCH_TIME_SHEETS_ERROR } from "../../store/actionTypes";
import {
  useHistory,
  BrowserRouter as Router,
  Link,
  useLocation
} from "react-router-dom";
import time_sheets from "../../store/reducers/time_sheets";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function TimeSheets() {
  let query = useQuery();
  const dispatch = useDispatch();
  const user_id = query.get('user_id');
  const selected_user_email = query.get('user')
  const time_sheets = useSelector(state => state.time_sheets.time_sheets);

  useEffect(() => {
    dispatch({type: FETCH_TIME_SHEETS_STARTED});
    const url = `/time_sheets?user_id=${user_id}`;
    ajax.get(url).then(
      (response) => {
        dispatch({type: FETCH_TIME_SHEETS_SUCCESS, payload: response.data});
      }
    ).catch(err => {
      dispatch({type: FETCH_TIME_SHEETS_ERROR});
    });
  }, [dispatch, user_id])

  return (
    <Container>
      <Row>
        <h1>Reports for: {selected_user_email}</h1>
      </Row>
      <Row>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>id</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Day</th>
              <th>actions</th>
            </tr>
          </thead>
          <tbody>
            {time_sheets.map((ts) => {
              return (
                <tr key={ts.id}>
                  <td>{ts.id}</td>
                  <td>{ts.start_time}</td>
                  <td>{ts.end_time}</td>
                  <td>{ts.day}</td>
                  <td>
                    <a>edit</a>
                    <a>delete</a>
                  </td>
                </tr>
            )})}
          </tbody>
        </Table>

      </Row>
    </Container>
  );
}

export default TimeSheets
