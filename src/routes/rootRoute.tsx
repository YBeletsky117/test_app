import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import { getUsersAction } from '../store/users';
import {AddUserPage, MainPage} from './';
import './index.css'

const RootRoute = () => {
  const [linkState, setLinkState] = useState(0),
  dispatch = useDispatch(),
    onClick = (event) => {
      setLinkState(+event.target.id)
    },
    links = [
      {
        key: 1,
        path: '/main',
        label: 'Main',
        Component: MainPage
      },
      {
        key: 2,
        path: '/addUser',
        label: 'Add User',
        Component: AddUserPage
      },
    ]
  if (linkState === 0) dispatch(getUsersAction())
  return (
    <div className='container-ext'>
      
        <Router>
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
                    <li className="nav-item">
                      <Link
                        {...{
                          className: `nav-link ${linkState === index && 'active'}`,
                          id: index.toString(),
                          to: link.path,
                          children: link.label,
                          onClick,
                          key: link.key
                        }} />
                    </li>
                  ))}
            </ul>
          </div>
        </div>
      </nav>
          <Switch>
            {links.map(({ path, Component, key }) => <Route {...{
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