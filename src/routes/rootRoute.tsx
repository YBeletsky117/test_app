import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import {AddUserPage, MainPage} from './';

const RootRoute = () => {
    return (
        <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Table</Link>
              </li>
              <li>
                <Link to="/addUser">Users</Link>
              </li>
            </ul>
          </nav>
  
          {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
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
    )
}
export default RootRoute