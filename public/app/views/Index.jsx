import React from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router';
import {pileSubmit} from '../reduxsaga/dispatch.js';
import NewThought from './NewThought.jsx';

class Index extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      status: ""
    };
    this.set_IndexStatus = (status) => {this.setState({status: status})};
    this.create_pile = this.create_pile.bind(this);
  }

  create_pile(rawContent, urlSiteInfo, id, time, contentType, tagArr, issueArr) {
    this.props.dispatch(pileSubmit({rawContent: rawContent, urlSiteInfo: urlSiteInfo, id: id, time: time, contentType: contentType, tagArr: tagArr, issueArr: issueArr}));
  }

  componentDidMount(){

  }

  render(){
    const style = {
      indexStyle: {
        width: "90%",
        height: "90%",
        position: "relative",
        zIndex: "0"
      },
      topStyle: {
        width: "100%",
        height: "100%",
        position: "absolute",
        left: "2%",
        boxSizing: "border-box",
        backgroundColor: "#FFFFFF",
        boxShadow: "0px 10px 10px -10px, 0px -10px 10px -10px",
        zIndex: "1"
      },
      crystal: {
        display: "inline-block",
        position: "absolute",
        top: "25%",
        left: "50%",
        transform: "translate(-50%, 0)",
        cursor: "pointer",
        zIndex: "1"
      },
      crystal_Editing: {
        display: "inline-block",
        position: "absolute",
        top: "5%",
        left: "5%",
        transform: "translate(-50%, 0)",
        cursor: "pointer",
        zIndex: "1"
      },
    }
    return(
      <div style={style.indexStyle}>
        <div style={style.topStyle}>
          <div
            style={this.state.status!=="input" ? style.crystal : style.crystal_Editing}
            onClick={this.handle_click_crystal}>
            (crystal)
          </div>
          <NewThought
            create_pile={this.create_pile}
            set_IndexStatus={this.set_IndexStatus}/>
        </div>
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
  Index
)
