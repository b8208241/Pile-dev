import React from 'react';

export class questionmarkDecorator extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    return(
      <span {...this.props} className="draftJsQuestionmark__questionmark">{this.props.children}</span>
    )
  }
}

export class hyphenDecorator extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    return(
      <spam {...this.props} className="draftJsHyphen_hyphen">{this.props.children}</spam>
    )
  }
}
