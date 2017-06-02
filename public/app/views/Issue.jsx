import React from 'react';
import { Link } from 'react-router';
import {connect} from 'react-redux';
import EditorPanel from './editors/EditorPanel.jsx';
import DisplayEditor from './editors/DisplayEditor.jsx';
import UrlPreview from './generals/UrlPreview.jsx';
import {pileSubmit} from '../reduxsaga/dispatch.js';

class Issue extends React.Component {
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
    const allepiles = this.props.allepiles;
    const issueName = this.props.params.issueName;
    let XSsize = {display: "inline-block", width: "10vw", height: "20vh", margin: "2.5vh 3vw", border: "3px solid", borderColor: "#D64A1E", overflowY: "auto"};
    let Ssize = {display: "inline-block", width: "15vw", height: "20vh", margin: "2.5vh 1.5vw", border: "3px solid", borderColor: "#D64A1E", overflowY: "auto"};
    let Msize = {display: "inline-block", width: "20vw", height: "26vh", margin: "1vh 1vw", border: "3px solid", borderColor: "#D64A1E", overflowY: "auto"};
    let Lsize = {display: "inline-block", width: "25vw", height: "32vh", margin: "1vh 1vw", border: "3px solid", borderColor: "#D64A1E", overflowY: "auto"};

    let piles = this.props.issues[issueName].include.map(
      function(id){
        let pile = allepiles[id];
        return (
          <li
            key={"Key_"+issueName+"_"+String(id)}
            id={"id_"+issueName+String(id)}
            style={pile.time%4===0 ? Lsize : pile.time%4===1 ? Msize : pile.time%4===2 ? Ssize : XSsize}>
            <UrlPreview
              contentType={pile.contentType}
              previewState={pile.urlSiteInfo}
              />
            <DisplayEditor
              className=''
              rawContent={pile.rawContent}/>
          </li>
        )
      }
    )

    return(
      <section style={{fontSize: "16px", fontFamily: "'Noto Sans TC', Helvetica, '微軟正黑體', sans-serif"}}>
        <div style={{zIndex: '1'}}>
          <h3>{issueName}</h3>
          <Link to="/" activeStyle={{textDecoration: "none", color: "black"}}><p><span style={{fontSize: "1.5rem", fontWeight: "400", letterSpace: "0.5rem", lineHeight: "0.5rem"}}>User Me</span></p></Link>
        </div>
        <div style={{zIndex: '1'}}>
          <EditorPanel
            create_pile={this.create_pile}
            currentIssue={issueName}/>
        </div>
        <ul>
          {piles}
        </ul>
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
  Issue
)
