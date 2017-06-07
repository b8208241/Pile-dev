import React from 'react';
import { Link } from 'react-router';
import EditorPanel from './editors/EditorPanel.jsx';

export default class PileUp extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      editorFocus: false
    };
  }


  render() {
    return(
      <div style={{width: "35%", maxHeight: "60vh", position: "fixed", top: "23%", left: "32%", backgroundColor: "#FFFFFF", zIndex: '1'}}>
        {
          this.state.editorFocus ?
            <div style={{width: "100%", maxHeight: "50vh", boxShadow: "0 0 5px 0px", overflowY: "auto"}}>
              <EditorPanel
                create_pile={this.props.create_pile}/>
              <span
                style={{display: "inline-block", width: "30%", marginTop: "2%", fontWeight: "normal", color: "#9C9898", cursor: "pointer"}}
                onClick={(event) => {event.preventDefault();event.stopPropagation();this.setState({editorFocus: false})}}>Cancel</span>
            </div>
          : <div>
              <TypePanel
                types={this.props.types}/>
              <TagPanel
                tags={this.props.tags}/>
              <div
                style={{width: "100%", minHeight: "15vh", backgroundColor: "#FFFFFF", boxShadow: "0 0 5px 0px"}}
                onClick={(event) => {event.preventDefault();event.stopPropagation();this.setState({editorFocus: true})}}></div>
            </div>
        }
        <IssuePanel
          issues={this.props.issues}/>
      </div>
    )
  }
}

class TypePanel extends React.Component {
  constructor(props){
    super(props);
    this.state = {

    };
  }

  render() {
    let directory = []
    $.each(this.props.types, function(key, value){
      directory.push(
        <li
          key={"key_panel_types_"+key}
          style={{listStyle: "none"}}>
          <Link to={"pick/type/"+key} activeStyle={{textDecoration: "none", color: "black"}}>
            {key}
          </Link>
        </li>
      )
    });
    return(
      <div style={{display: "flex", justifyContent: "space-around"}}>
        {directory}
      </div>
    )
  }
}

class TagPanel extends React.Component {
  constructor(props){
    super(props);
    this.state = {

    };
  }

  render() {
    let directory = []
    $.each(this.props.tags, function(key, value){
      directory.unshift(
        <li
          key={key+"_"+value.include.length}
          style={{listStyle: "none"}}>
          <Link to={"pick/tag/"+key} activeStyle={{textDecoration: "none", color: "black"}}>
            {key}
          </Link>
        </li>
      );
    })
    return(
      <div style={{display: "flex", justifyContent: "space-around", minHeight: "1rem"}}>
        {directory}
      </div>
    )
  }
}

class IssuePanel extends React.Component {
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
      <div style={{}}>
        {directory}
      </div>
    )
  }
}
