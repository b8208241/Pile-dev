import React from 'react';
import DisplayEditor from './editors/DisplayEditor.jsx';

export default class UserPiles extends React.Component {
  constructor(props){
    super(props);
    this.state = {

    };
  }

  render() {
    const ulStyle = {
      display: "flex",
      flexDirection: "column",
      flexWrap: "wrap",
      alignContent: "flex-start",
      width: "95%",
      height: "90%",
      padding: '0',
      position: "absolute",
      top: '0',
      left: "0",
      listStyle: "none",
      overflowX: "auto"
    };

    const allepiles = this.props.allepiles;
    const keysArr = Object.keys(allepiles);
    /**reverse() here is just because the order in reducer starting from the earlist
    could delete if the reducer would be modified**/
    keysArr.reverse();
    let piles = _renderByOrder(allepiles, keysArr)

    return(
      <div>
        <ul style={ulStyle}>
          {piles}
        </ul>
      </div>
    )
  }
}

function _renderByOrder(allepiles, keysArr){
  return keysArr.map(
    function(id, index){
      const pileData = allepiles[id];
      const listStyle = {
        display: "inline-flex",
        justifyContent: "center",
        alignItems: "center",
        width: "28%",
        height: "30%",
        boxSizing: 'border-box'
      };
      const listDivStyle = {
        width: '88%',
        height: '90%',
        margin: "",
        boxSizing: 'border-box',
        border: "3px solid",
        borderColor: "#D64A1E",
        overflow: "hidden",
        fontSize: "",
        cursor: "pointer"
      };

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
          renderElement = (<div><div>{pileData.urlSiteInfo.fileHost}</div><embed type="application/pdf" src={pileData.urlSiteInfo.embed} style={{width: "95%", height: "auto"}}/></div>);
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
          key={"key_UserPiles"+String(pileData.id)}
          id={"id_UserPiles"+String(pileData.id)}
          data-keysarr-index={index}
          style={listStyle}>
          <div
            style={listDivStyle}
            >
            {renderElement}
          </div>
        </li>
      );
    }
  )
}
