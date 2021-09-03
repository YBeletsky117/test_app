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

const RootRoute = () => {
  const dispatch = useDispatch(),
    links = [
      {
        path: '/',
        label: 'Main',
        component: MainPage
      },
      {
        path: '/addUser',
        label: 'Add User',
        component: AddUserPage
      },
    ]
  useEffect(() => {
    dispatch(getUsersAction())
  }, [dispatch])
  
  return (
    <Router basename='/test_app/'>
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
            {links.map(({ path, component }, key) => <Route {...{
              exact: true,
              key,
              path,
              component
            }} />)}
          </Switch>
      </Router>
    )
}
export default RootRoute