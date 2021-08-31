import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import {AddUserPage, MainPage} from './';
import './index.css'

const RootRoute = () => {
    return (
      <div className='main' >
        <Router>
        <div className='router'>
          <nav>
            <ul>
              <li>
                <Link to="/">Table</Link>
              </li>
              <li>
                <Link to="/addUser">Add User</Link>
              </li>
            </ul>
          </nav>
          <Switch>
            <Route path="/">
              <MainPage />
            </Route>
            <Route path="/addUser">
              <AddUserPage />
            </Route>
          </Switch>
        </div>
      </Router>
      </div>
    )
}
export default RootRoute