import React from 'react';
import {Provider} from 'react-redux'
import {Router, Route, IndexRoute, browserHistory} from 'react-router'
//import RoutesLevel from './RoutesLevel.jsx'
import PileUp from './PileUp.jsx';
import UserPiles from './UserPiles.jsx';
import TagRegion from './TagRegion.jsx';

export default class RouterLevel extends React.Component {
  render() {
    return (
      <Provider store={this.props.store}>
        <Router history={browserHistory}>
          <Route path="/" component={PileUp}>
            <IndexRoute component={UserPiles}/>
            <Route path=":tagName" component={TagRegion}/>
          </Route>
        </Router>
      </Provider>
    );
  }
}
