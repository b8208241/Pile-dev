import React from 'react';
import ReactDOM from 'react-dom';

const renderSubtreeIntoContainer = ReactDOM.unstable_renderSubtreeIntoContainer;

export default class ModalBox extends React.Component {
  constructor(props){
    super(props);
    this.newModalBox
  }

  componentDidMount(){
    this.newModalBox = document.getElementsByTagName('body')[0].appendChild(document.createElement('div'));
    renderSubtreeIntoContainer(this, this.props.children, this.newModalBox);
  }

  componentDidUpdate(){
    renderSubtreeIntoContainer(this, this.props.children, this.newModalBox);
  }

  componentWillUnmount(){
    ReactDOM.unmountComponentAtNode(this.newModalBox);
    document.getElementsByClassName('container')[0].removeChild(this.newModalBox);
  }

  render() {
    return null;
  }
}
