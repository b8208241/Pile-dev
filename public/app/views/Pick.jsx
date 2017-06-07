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
    let allepiles = this.props.allepiles;
    let idArr =  this.props.params.way==="tag" ? this.props.tags[this.props.params.name].include : this.props.types[this.props.params.name];
    let piles = idArr.length>0 ? idArr.map(
      function(id){
        let pileData = allepiles[id];
        let pile = renderDOMPile(pileData, "pick");
        return pile;
      }
    ) : [];

    return(
      <ul style={{width: "80%", maxHeight: "85vh", padding: '0', position: "absolute", top: '40%', left: "3%", transform: "translate(0, -40%)", listStyle: "none", overflow: "auto"}}>
        {piles}
      </ul>
    )
  }
}

function renderDOMPile(pileData, location){
  let XSsize = {maxWidth: "60%", height: "65%", margin: "auto", border: "3px solid", borderColor: "#D64A1E", overflowY: "hidden"};
  let Ssize = {maxWidth: "75%", height: "75%", margin: "auto", border: "3px solid", borderColor: "#D64A1E", overflowY: "hidden"};
  let Msize = {maxWidth: "88%", height: "85%", margin: "auto", border: "3px solid", borderColor: "#D64A1E", overflowY: "hidden"};
  let Lsize = {maxWidth: "100%", height: "100%", margin: "auto", border: "3px solid", borderColor: "#D64A1E", overflowY: "hidden"};
  let renderElement;
  let contentType = pileData.contentType;
  switch (contentType) {
    case "web":
    let renderType;
    let previewState = {
      "description": pileData.urlSiteInfo.description,
      "img": pileData.urlSiteInfo.img,
      "url": pileData.urlSiteInfo.url,
      "title": pileData.urlSiteInfo.title
    };
    $.each(previewState, function(previewKey, previewValue){
      if(previewValue == null){
        return;
      }else{
        renderType=previewKey;
        return false;
      }
    })
    switch (renderType) {
      case "img":
        renderElement = (<div><h4>{pileData.urlSiteInfo.title}</h4><img src={pileData.urlSiteInfo.img} style={{maxWidth: "80%", maxHeight: "100%"}}/></div>);
        break;
      case "description":
        renderElement = (<div><h4>{pileData.urlSiteInfo.title}</h4><p>{pileData.urlSiteInfo.description}</p></div>)
        break;
      case "url":
        renderElement = (<div><h4>{pileData.urlSiteInfo.title}</h4><a href={pileData.urlSiteInfo.url} target="_blank">{pileData.urlSiteInfo.url}</a></div>);
        break;
      case "title":
        renderElement = (<div><h4>{pileData.urlSiteInfo.title}</h4></div>);
        break;
      default:
        renderElement = (<DisplayEditor className='' rawContent={pileData.rawContent}/>)
    }
      break;
    case "image":
      renderElement = (<img src={pileData.urlSiteInfo.img} style={{maxWidth: "80%", height: "auto"}}/>);
      break;
    case "file-pdf":
      renderElement = (<div><div>{pileData.urlSiteInfo.fileHost}</div><img src={pileData.urlSiteInfo.icon} style={{maxWidth: "80%", height: "auto"}}/></div>);
      break;;
    case "unclear":
      renderElement = (<h4>{pileData.urlSiteInfo.title}</h4>)
      break;
    default:
      renderElement = (<DisplayEditor className='' rawContent={pileData.rawContent}/>);
      break;
  }
  return (
    <li
      key={"Key_"+location+"_"+String(pileData.id)}
      id={"id_"+location+String(pileData.id)}
      style={{display: "inline-block", width: "23vw", height: "32vh", margin: "1vh 1vw"}}>
      <div
        style={pileData.time%4===0 ? Lsize : pileData.time%4===1 ? Msize : pileData.time%4===2 ? Ssize : XSsize}>
        {renderElement}
      </div>
    </li>
  );
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
