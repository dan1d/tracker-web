import React from "react";
import { useSelector } from 'react-redux';
import { Navbar } from 'react-bootstrap';


function TopBar() {
  const { current_user } = useSelector(state => state.users);

  return (
    <Navbar>
      <Navbar.Brand href="#home">Tracker</Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end">
        <Navbar.Text>
          Signed in as {current_user.role.kind}: <a href="#login">{current_user.email}</a>
        </Navbar.Text>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default TopBar
