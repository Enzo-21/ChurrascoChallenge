import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import './App.scss';
import { Navbar, Login, Alert, Sites, PrivateRoute } from './components'


//Redux
import { Provider } from 'react-redux'
import store from './redux/store'
import setAuthToken from './utils/setAuthToken';
import { authUser } from './redux/actions/authActions';



if (localStorage.token) {
  setAuthToken(localStorage.token)
}



const App = () => {

  useEffect(() => {
    store.dispatch(authUser())
  }, [])

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Alert />
          <section className="container mt-4">
            <Route path='/'>
              <Redirect to="/sites" />
            </Route>
            <Switch>
              <Route exact path='/login' component={Login} />
              <PrivateRoute exact path='/sites' component={Sites} />
            </Switch>

          </section>
         
        </Fragment>
      </Router>
    </Provider>

  );
}

export default App;
