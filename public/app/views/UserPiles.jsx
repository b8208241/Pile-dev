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
    let Ssize = {display: "inline-block", width: "10vw", height: "10vh", margin: "1vw", border: "3px solid", borderColor: "#D64A1E", overflowY: "auto"};
    let Msize = {display: "inline-block", width: "20vw", height: "20vh", margin: "1vw", border: "3px solid", borderColor: "#D64A1E", overflowY: "auto"};
    let Lsize = {display: "inline-block", width: "25vw", height: "30vh", margin: "1vw", border: "3px solid", borderColor: "#D64A1E", overflowY: "auto"};
    let piles = [];
    $.each(this.props.allepiles, function(key, value){
      piles.unshift(
        <li
          key={"pileupkey_"+String(value.id)}
          id={"pileupid_"+String(value.id)}
          style={value.time%3===0 ? Lsize : value.time%3===1 ? Msize : Ssize}>
          <UrlPreview
            previewState={value.urlSiteInfo}
            />
          <DisplayEditor
            className=''
            rawContent={value.rawContent}/>
        </li>
      );
    });

    return(
      <ul style={{width: "53%", padding: '0', position: "absolute", top: '15%', left: "50%", transform: "translate(-50%, 0)", listStyle: "none", overflow: "auto"}}>
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
