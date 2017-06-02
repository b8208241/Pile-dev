import React from 'react';
import {Provider} from 'react-redux'
import {Router, Route, IndexRoute, browserHistory} from 'react-router'
//import RoutesLevel from './RoutesLevel.jsx'
import PileUp from './PileUp.jsx';
import Issue from './Issue.jsx';
import UserPiles from './UserPiles.jsx';
import Pick from './Pick.jsx';

export default class RouterLevel extends React.Component {
  render() {
    return (
      <Provider store={this.props.store}>
        <Router history={browserHistory}>
          <Route path="/" component={PileUp}>
            <IndexRoute component={UserPiles}/>
            <Route path="pick/:way/:name" component={Pick}/>
          </Route>
          <Route path="/issue/:issueName" component={Issue}/>
        </Router>
      </Provider>
    );
  }
}
