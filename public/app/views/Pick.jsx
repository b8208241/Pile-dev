import React from 'react';
import {connect} from 'react-redux';
import DisplayEditor from './editors/DisplayEditor.jsx';
import UrlPreview from './generals/UrlPreview.jsx';

class Pick extends React.Component {
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
    let allepiles = this.props.allepiles;
    let idArr =  this.props.params.way==="tag" ? this.props.tags[this.props.params.name].include : this.props.types[this.props.params.name];
    let piles = idArr.length>0 ? idArr.map(
      function(id){
        let pile = allepiles[id];
        return (
          <li
            key={"key_pick"+String(id)}
            id={"key_pick"+String(id)}
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
    ) : [];

    return(
      <ul style={{width: "50%", position: "absolute", left: "50%", transform: "translate(-50%, 0)", listStyle: "none"}}>
        {piles}
      </ul>
    )
  }
}

function mapStateToProps (state) {
  return {
    allepiles: state.allepiles,
    tags: state.tags,
    types: state.types,
    status: state.status,
    others: state.others
  }
}

export default connect(mapStateToProps)(
  Pick
)
