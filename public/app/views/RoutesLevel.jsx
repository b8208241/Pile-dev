import React from 'react';
import {Route} from 'react-router'
import {PileUp} from './PileUp.jsx';

export default class RoutesLevel extends React.Component {
  render() {
    return (
      <Route path="/" component={PileUp}/>
    );
  }
}
