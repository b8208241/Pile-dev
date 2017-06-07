import React from 'react';
import {connect} from 'react-redux';
import DisplayEditor from './editors/DisplayEditor.jsx';

class UserPiles extends React.Component {
  constructor(props){
    super(props);
    this.state = {

    };
  }

  render() {
    let XSsize = {maxWidth: "60%", height: "65%", margin: "auto", border: "3px solid", borderColor: "#D64A1E", overflowY: "hidden"};
    let Ssize = {maxWidth: "75%", height: "75%", margin: "auto", border: "3px solid", borderColor: "#D64A1E", overflowY: "hidden"};
    let Msize = {maxWidth: "88%", height: "85%", margin: "auto", border: "3px solid", borderColor: "#D64A1E", overflowY: "hidden"};
    let Lsize = {maxWidth: "100%", height: "100%", margin: "auto", border: "3px solid", borderColor: "#D64A1E", overflowY: "hidden"};
    let piles = [];
    $.each(this.props.allepiles, function(key, value){
      let renderElement;
      let contentType = value.contentType;
      switch (contentType) {
        case "web":
        let renderType;
        let previewState = {
          "description": value.urlSiteInfo.description,
          "img": value.urlSiteInfo.img,
          "url": value.urlSiteInfo.url,
          "title": value.urlSiteInfo.title
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
            renderElement = (<div><h4>{value.urlSiteInfo.title}</h4><img src={value.urlSiteInfo.img} style={{maxWidth: "80%", maxHeight: "100%"}}/></div>);
            break;
          case "description":
            renderElement = (<div><h4>{value.urlSiteInfo.title}</h4><p>{value.urlSiteInfo.description}</p></div>)
            break;
          case "url":
            renderElement = (<div><h4>{value.urlSiteInfo.title}</h4><a href={value.urlSiteInfo.url} target="_blank">{value.urlSiteInfo.url}</a></div>);
            break;
          case "title":
            renderElement = (<div><h4>{value.urlSiteInfo.title}</h4></div>);
            break;
          default:
            renderElement = (<DisplayEditor className='' rawContent={value.rawContent}/>)
        }
          break;
        case "image":
          renderElement = (<img src={value.urlSiteInfo.img} style={{maxWidth: "80%", height: "auto"}}/>);
          break;
        case "file-pdf":
          renderElement = (<div><div>{value.urlSiteInfo.fileHost}</div><img src={value.urlSiteInfo.icon} style={{maxWidth: "80%", height: "auto"}}/></div>);
          break;;
        case "unclear":
          renderElement = (<h4>{value.urlSiteInfo.title}</h4>)
          break;
        default:
          renderElement = (<DisplayEditor className='' rawContent={value.rawContent}/>);
          break;
      }
      piles.unshift(
        <li
          key={"pileupkey_"+String(value.id)}
          id={"pileupid_"+String(value.id)}
          style={{display: "inline-block", width: "23vw", height: "32vh", margin: "1vh 1vw"}}>
          <div
            style={value.time%4===0 ? Lsize : value.time%4===1 ? Msize : value.time%4===2 ? Ssize : XSsize}>
            {renderElement}
          </div>
        </li>
      );
    });

    return(
      <ul style={{width: "80%", maxHeight: "85vh", padding: '0', position: "absolute", top: '40%', left: "3%", transform: "translate(0, -40%)", listStyle: "none", overflow: "auto"}}>
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
