import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import Loadable from 'react-loadable';

const Loading = ({isLoading, error}) => {
  // 暂不做加载动画
  if (isLoading) {
    return null;
  } else if (error) {
    return null;
  } else {
    return null;
  }
};

const Index = Loadable({
  loader: () => import('../pages/Index'),
  loading: Loading
});
const Static = Loadable({
  loader: () => import('../pages/Static'),
  loading: Loading
});

class App extends React.Component {
  static propTypes = {
    location: PropTypes.object.isRequired
  };

  render() {
    return (
      <Router>
        <Switch>
          <Route path="/index/:pageId" exact component={Index} />
          <Route path="/static" exact component={Static} />
        </Switch>
      </Router>
    );
  }
}

export default hot(module)(App);
