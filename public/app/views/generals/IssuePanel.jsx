import React from 'react';
import { Link } from 'react-router';

export default class IssuePanel extends React.Component {
  constructor(props){
    super(props);
    this.state = {

    };
  }

  render() {
    let directory = []
    $.each(this.props.issues, function(key, value){
      directory.unshift(
        <li
          key={key+"_"+value.include.length}
          style={{listStyle: "none"}}>
          <Link to={"issue/"+key} activeStyle={{textDecoration: "none", color: "black"}}>
            [{key}]
          </Link>
        </li>
      );
    })
    return(
      <div style={this.props.style}>
        {directory}
      </div>
    )
  }
}
