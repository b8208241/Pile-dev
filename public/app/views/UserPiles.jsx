import React from 'react';
import {connect} from 'react-redux';
import DisplayEditor from './editors/DisplayEditor.jsx';
import UrlPreview from './generals/UrlPreview.jsx';

class UserPiles extends React.Component {
  constructor(props){
    super(props);
    this.state = {

    };
  }

  render() {
    let XSsize = {display: "inline-block", width: "10vw", height: "20vh", margin: "2.5vh 3vw", border: "3px solid", borderColor: "#D64A1E", overflowY: "auto"};
    let Ssize = {display: "inline-block", width: "15vw", height: "20vh", margin: "2.5vh 1.5vw", border: "3px solid", borderColor: "#D64A1E", overflowY: "auto"};
    let Msize = {display: "inline-block", width: "20vw", height: "26vh", margin: "1vh 1vw", border: "3px solid", borderColor: "#D64A1E", overflowY: "auto"};
    let Lsize = {display: "inline-block", width: "25vw", height: "32vh", margin: "1vh 1vw", border: "3px solid", borderColor: "#D64A1E", overflowY: "auto"};
    let piles = [];
    $.each(this.props.allepiles, function(key, value){
      piles.unshift(
        <li
          key={"pileupkey_"+String(value.id)}
          id={"pileupid_"+String(value.id)}
          style={value.time%4===0 ? Lsize : value.time%4===1 ? Msize : value.time%4===2 ? Ssize : XSsize}>
          <UrlPreview
            contentType={value.contentType}
            previewState={value.urlSiteInfo}
            />
          <DisplayEditor
            className=''
            rawContent={value.rawContent}/>
        </li>
      );
    });

    return(
      <ul style={{width: "70%", padding: '0', position: "absolute", top: '25%', left: "50%", transform: "translate(-45%, 0)", listStyle: "none", overflow: "auto"}}>
        {piles}
      </ul>
    )
  }
}

function mapStateToProps (state) {
  return {
    allepiles: state.allepiles,
    tags: state.tags,
    status: state.status,
    others: state.others
  }
}

export default connect(mapStateToProps)(
  UserPiles
)
