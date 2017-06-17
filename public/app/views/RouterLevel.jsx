import React from 'react';
import {Provider} from 'react-redux'
import {Router, Route, IndexRoute, browserHistory} from 'react-router'
//import RoutesLevel from './RoutesLevel.jsx'
import User from './User.jsx';
import Index from './Index.jsx';
import Issue from './Issue.jsx';
import Pick from './Pick.jsx';

export default class RouterLevel extends React.Component {
  render() {
    return (
      <Provider store={this.props.store}>
        <Router history={browserHistory}>
          <Route path="/" component={User}>
            <IndexRoute component={Index}/>
            <Route path="pick/:way/:name" component={Pick}/>
            <Route path="/issue/:issueName" component={Issue}/>
          </Route>
        </Router>
      </Provider>
    );
  }
}
