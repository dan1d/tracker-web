import React, { useEffect } from "react"
import { Table } from 'react-bootstrap'
import { useSelector, useDispatch } from "react-redux";
import { FETCH_USERS_STARTED, FETCH_USERS_SUCCESS, FETCH_USERS_ERROR } from "../store/actionTypes";
import ajax from "../utils/http-common";
import {
  Link
 } from "react-router-dom";

function AdminDashboard() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({type: FETCH_USERS_STARTED});
    ajax.get('/users').then((res) => {
      console.log(res)
      dispatch({type: FETCH_USERS_SUCCESS, payload: res.data});
    }).catch((err) => {
      console.log(err, 'err')
      dispatch({type: FETCH_USERS_ERROR});
    })
    return () => {
    };
  }, [dispatch]);

  const users = useSelector(state => state.users.users);

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>email</th>
          <th>role</th>
          <th>actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => {
          return (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role.kind}</td>
              <td>
                <a>edit</a>
                <Link
                  to={{
                    pathname: "/timesheets",
                    search: `?user_id=${user.id}&email=${user.email}`,
                    state: { fromDashboard: true }
                  }}
                >View Entries</Link>
              </td>
            </tr>
        )})}
      </tbody>
    </Table>
  )

}

export default AdminDashboard
