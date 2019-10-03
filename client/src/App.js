import React from 'react';
import Home from './components/Home';
import UserLinkTree from './components/UserLinkTree';
import NotFound from './components/NotFound';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Admin from './components/Admin';
import Footer from './components/Footer';
import Settings from './components/Settings';
import Edit from './components/Edit';

const App = () => {

  const isAuth = {
    token: localStorage.getItem('auth-token')
  }

  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" render={() => (
            isAuth.token ? <Redirect to='/admin'/> : <Home />
          )} />
          <Route path="/admin" render={() => (
            isAuth.token ? <Admin /> : <Redirect to='/' />
          )}/>
          <Route path="/signup" component={SignUp} />
          <Route path="/login" component={Login} />
          <Route path="/settings" render={() => (
            isAuth.token ? <Settings /> : <Redirect to='/' />
          )} />
          <Route path="/edit" render={() => (
            isAuth.token ? <Edit /> : <Redirect to='/' />
          )} />
          {/* All other paths need to remain above the username path */}
          <Route path="/:username" component={UserLinkTree} />
          <Route component={NotFound} />
        </Switch>
        <Route path="/" component={Footer} />
      </div>
    </Router>
  )
}

export default App




