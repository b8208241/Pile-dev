import React from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router';
import Panels from './Panels.jsx';
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
    let props = this.props;
    let children = React.Children.map(this.props.children, function (child) {
      return React.cloneElement(
        child,
        {
          allepiles: props.allepiles,
          issues: props.issues,
          tags: props.tags,
          types: props.types,
          status: props.status,
          others: props.others
        }
      )
    })
    return(
      <section style={{fontSize: "16px", fontFamily: "'Noto Sans TC', Helvetica, '微軟正黑體', sans-serif"}}>
        <div style={{display: "inline-block", marginLeft: "5%", fontSize: "1.8rem", fontWeight: "bold"}}>Curios</div>
        <div style={{position: "fixed", top: "35%", right: "3%", backgroundColor: "#FFFFFF", textAlign: "left", zIndex: '1'}}>
          <Link to="/" activeStyle={{textDecoration: "none", color: "black"}}><p><span style={{fontSize: "1.8rem", fontWeight: "bold", letterSpace: "0.5rem", lineHeight: "0.5rem"}}>User Me</span></p></Link>
        </div>
        <Panels
          issues={this.props.issues}
          types={this.props.types}
          tags={this.props.tags}
          create_pile={this.create_pile}/>
        {children}
      </section>
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
