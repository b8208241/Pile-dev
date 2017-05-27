import React from 'react';
import {connect} from 'react-redux';
import DisplayEditor from './editors/DisplayEditor.jsx';

class TagRegion extends React.Component {
  constructor(props){
    super(props);
    this.state = {

    };
  }

  render() {
    let Ssize = {display: "inline-block", width: "5vw", height: "10vh", margin: "1vw", border: "3px solid", borderColor: "#D64A1E"};
    let Msize = {display: "inline-block", width: "10vw", height: "20vh", margin: "1vw", border: "3px solid", borderColor: "#D64A1E"};
    let Lsize = {display: "inline-block", width: "15vw", height: "30vh", margin: "1vw", border: "3px solid", borderColor: "#D64A1E"};
    let allepiles = this.props.allepiles;
    let piles = this.props.tags[this.props.params.tagName].include.map(
      function(id){
        let pile = allepiles[id];
        return (
          <li
            key={"pileupkey_"+String(id)}
            id={"pileupid_"+String(id)}
            style={pile.time%3===0 ? Lsize : pile.time%3===1 ? Msize : Ssize}>
            <DisplayEditor
              className=''
              rawContent={pile.rawContent}/>
          </li>
        )
      }
    )

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
    status: state.status,
    others: state.others
  }
}

export default connect(mapStateToProps)(
  TagRegion
)
