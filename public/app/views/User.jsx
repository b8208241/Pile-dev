import React from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router';

class User extends React.Component {
  constructor(props){
    super(props);
    this.state = {

    };
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
      <section style={{width: "100%", height: "100%", position: "absolute", top: "0", left: "0", fontSize: "16px", fontFamily: "'Noto Sans TC', Helvetica, '微軟正黑體', sans-serif"}}>
        <div style={{display: "inline-block", marginLeft: "5%", fontSize: "1.8rem", fontWeight: "bold", zIndex: "1"}}>Curios</div>
        <div style={{position: "fixed", top: "35%", right: "3%", backgroundColor: "#FFFFFF", textAlign: "left", zIndex: '1'}}>
          <Link to="/" activeStyle={{textDecoration: "none", color: "black"}}><p><span style={{fontSize: "1.8rem", fontWeight: "bold", letterSpace: "0.5rem", lineHeight: "0.5rem"}}>User Me</span></p></Link>
        </div>
        <div style={{position: "fixed", bottom: "2%", left: "3%", boxSizing: "border-box", backgroundColor: "#FFFFFF", fontSize: "1.5rem", fontWeight: "500", color: "black", zIndex: "1"}}>call</div>
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
  User
)
