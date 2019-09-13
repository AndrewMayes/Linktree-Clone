import React from 'react';
import Home from './components/Home';
import UserLinkTree from './components/UserLinkTree';
import NotFound from './components/NotFound';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/:username" component={UserLinkTree} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  )
}

export default App




