import React, { useEffect } from "react"
import { Table } from 'react-bootstrap'
import { useSelector, useDispatch } from "react-redux";
import { FETCH_USERS_STARTED, FETCH_USERS_SUCCESS, FETCH_USERS_ERROR } from "../store/actionTypes";
import ajax from "../utils/http-common";

function UserDashboard() {
  const dispatch = useDispatch();
  const users = useSelector(state => state.users.users);

  useEffect(() => {
    dispatch({TYPE: FETCH_USERS_STARTED});
    ajax.get('/users').then((res) => {
      dispatch({TYPE: FETCH_USERS_SUCCESS, payload: res.data});
    }).catch((err) => {
      dispatch({TYPE: FETCH_USERS_ERROR});
    })
    return () => {
    };
  }, [dispatch]);

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
              <td>{user.role.email}</td>
              <td>
                <a>edit</a>
                <a>show reports</a>
              </td>
            </tr>
        )})}
      </tbody>
    </Table>
  )

}

export default UserDashboard
