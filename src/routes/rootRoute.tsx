import React from 'react'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
    BrowserRouter as Router,
    Switch,
  Route,
  Link,
} from "react-router-dom";
import { Navbar, Container, Nav } from 'react-bootstrap';
import { getUsersAction } from '../store/users';
import {AddUserPage, MainPage} from './';
import { useRef } from 'react';

const RootRoute = () => {
  const dispatch = useDispatch(),
    links = [
      {
        path: '/',
        label: 'Main',
        Component: MainPage
      },
      {
        path: '/addUser',
        label: 'Add User',
        Component: AddUserPage
      },
    ]
  useEffect(() => {
    dispatch(getUsersAction())
  }, [dispatch])
  console.log(document.location.pathname)
  
  return (
    <Router>
          <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
              <Navbar.Brand >APP</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  {links.map((link, index) => <Link
                    {...{
                      key: index.toString(),
                      className: `nav-link`,
                      id: link.path,
                      to: link.path,
                      children: link.label
                    }} />)}
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
          <Switch>
            {links.map(({ path, Component }, key) => <Route {...{
              exact: true,
              key,
              path,
              children: <Component />
            }} />)}
          </Switch>
      </Router>
    )
}
export default RootRoute