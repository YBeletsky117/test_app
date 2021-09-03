import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from "react-router-dom";
import { getUsersAction } from '../store/users';
import {AddUserPage, MainPage} from './';
import './index.css'

const RootRoute = (props) => {
  const [linkState, setLinkState] = useState<String>(document.location.pathname),
  dispatch = useDispatch(),
    onClick = (event) => {
      setLinkState(event.target.id)
    },
    links = [
      {
        path: '/main',
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
  // eslint-disable-next-line
    }, [])
  
  return (
    <div className='container-ext'>
      
      <Router>
        {document.location.pathname === '/' && <Redirect from='/' to='/main' />}
        <div className='router'>
        <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container-xxl">
          <a className="navbar-brand" href="/main">App</a>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
              >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  {links.map((link, index) => (
                    <li className="nav-item" key={index}>
                      <Link
                        {...{
                          className: `nav-link ${linkState === link.path && 'active'}`,
                          id: link.path,
                          to: link.path,
                          children: link.label,
                          onClick
                        }} />
                    </li>
                  ))}
            </ul>
          </div>
        </div>
      </nav>
          <Switch>
            {links.map(({ path, Component }, key) => <Route {...{
              key,
              path,
              children: <Component/>
            }} />)}
          </Switch>
        </div>
      </Router>
    </div>
    )
}
export default RootRoute