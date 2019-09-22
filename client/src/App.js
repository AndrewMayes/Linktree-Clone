import React from 'react';
import Home from './components/Home';
import UserLinkTree from './components/UserLinkTree';
import NotFound from './components/NotFound';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Admin from './components/Admin';
import Footer from './components/Footer';
import Settings from './components/Settings';

const App = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/admin" component={Admin} />
          <Route path="/signup" component={SignUp} />
          <Route path="/login" component={Login} />
          <Route path="/settings" component={Settings} />
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




