import React from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router';
import EditorPanel from './editors/EditorPanel.jsx';
import {pileSubmit} from '../reduxsaga/dispatch.js';

class PileUp extends React.Component {
  constructor(props){
    super(props);
    this.state = {

    };
    this.create_pile = this.create_pile.bind(this);
  }

  create_pile(rawContent, urlSiteInfo, id, time, contentType, tagArr, issueArr) {
    this.props.dispatch(pileSubmit({rawContent: rawContent, urlSiteInfo: urlSiteInfo, id: id, time: time, contentType: contentType, tagArr: tagArr, issueArr: issueArr}));
  }

  render() {
    let allepiles = this.props.allepiles;
    let tags = this.props.tags;
    let status = this.props.status;
    let others = this.props.others;
    let children = React.Children.map(this.props.children, function (child) {
      return React.cloneElement(
        child,
        {
          allepiles: allepiles,
          tags: tags,
          status: status,
          others: others
        }
      )
    })
    return(
      <section style={{fontSize: "16px", fontFamily: "'Noto Sans TC', Helvetica, '微軟正黑體', sans-serif"}}>
        <div style={{width: "25%", position: "fixed", top: "20%", left: "25%", backgroundColor: "#FFFFFF", textAlign: "left", zIndex: '1'}}>
          <Link to="/" activeStyle={{textDecoration: "none", color: "black"}}><p><span style={{fontSize: "2.5rem", fontWeight: "bold", letterSpace: "0.5rem", lineHeight: "1rem"}}>User Me</span></p></Link>
        </div>
        <div style={{width: "25%", position: "fixed", top: "20%", left: "50%", backgroundColor: "#FFFFFF", zIndex: '1'}}>
          <EditorPanel
            create_pile={this.create_pile}/>
        </div>
        <TypePanel
          types={this.props.types}/>
        <TagPanel
          tags={this.props.tags}/>
        <IssuePanel
          issues={this.props.issues}/>
        {children}
      </section>
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
      <div style={{position: "fixed", top: "30%", left: "40%", backgroundColor: "#FFFFFF", zIndex: "1"}}>
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
      <div style={{position: "fixed", top: "30%", left: "55%", backgroundColor: "#FFFFFF", zIndex: "1"}}>
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
      <div style={{position: "fixed", top: "30%", left: "30%", backgroundColor: "#FFFFFF", zIndex: "1"}}>
        {directory}
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    allepiles: state.allepiles,
    types: state.types,
    tags: state.tags,
    issues: state.issues,
    status: state.status,
    others: state.others
  }
}

export default connect(mapStateToProps)(
  PileUp
)
