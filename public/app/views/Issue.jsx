import React from 'react';
import { Link } from 'react-router';
import {connect} from 'react-redux';
import update from 'immutability-helper';
import EditorPanel from './editors/EditorPanel.jsx';
import DisplayEditor from './editors/DisplayEditor.jsx';
import UrlPreview from './generals/UrlPreview.jsx';
import ModalBox from './generals/ModalBox.jsx';
import {pileSubmit, _updatePile_issueArr} from '../reduxsaga/dispatch.js';

class Issue extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      issuePiles: [],
      creatingState: false,
      userPilesList: false
    };
    this.create_pile = this.create_pile.bind(this);
    this.attach_pile_issue = this.attach_pile_issue.bind(this);
    this.issueName = this.props.params.issueName;
  }

  attach_pile_issue(id){
    let issueName = this.issueName;
    let newPileData = update(this.props.allepiles[id], {
      "issueArr": {$push: [issueName]}
    });
    let newPile = renderDOMPile(newPileData, this.issueName)
    this.state.issuePiles.push(newPile);
    this.setState({issuePiles: this.state.issuePiles});
    this.props.dispatch(_updatePile_issueArr(newPileData, issueName))
  }

  create_pile(rawContent, urlSiteInfo, id, time, contentType, tagArr, issueArr) {
    let newPileData = {rawContent: rawContent, urlSiteInfo: urlSiteInfo, id: id, time: time, contentType: contentType, tagArr: tagArr, issueArr: issueArr};
    let newPile = renderDOMPile(newPileData, this.issueName);
    this.state.issuePiles.push(newPile);
    this.setState({issuePiles: this.state.issuePiles});
    this.props.dispatch(pileSubmit(newPileData));
  }

  componentWillMount(){
    const allepiles = this.props.allepiles;
    let issueName = this.issueName;
    let piles = this.props.issues[this.issueName].include.map(
      function(id){
        let pileData = allepiles[id];
        let pile = renderDOMPile(pileData, issueName);
        return pile;
      }
    )
    this.setState({issuePiles: piles});
  }

  render() {
    return(
      <section style={{fontSize: "16px", fontFamily: "'Noto Sans TC', Helvetica, '微軟正黑體', sans-serif"}}>
        <div style={{display: "inline-block", marginLeft: "5%", fontSize: "1.8rem", fontWeight: "bold"}}>Curios</div>
        <div style={{position: "fixed", top: "35%", right: "3%", backgroundColor: "#FFFFFF", textAlign: "left", zIndex: '1'}}>
          <Link to="/" activeStyle={{textDecoration: "none", color: "black"}}><p><span style={{fontSize: "1.8rem", fontWeight: "bold", letterSpace: "0.5rem", lineHeight: "0.5rem"}}>User Me</span></p></Link>
        </div>
        {
          !this.state.creatingState &&
          <div>
            <h3 style={{zIndex: '1'}}>{this.issueName}</h3>
            <div style={{width: "30%", maxHeight: "75%", position: "fixed", top: "20%", left: "45%", backgroundColor: "#FFFFFF", overflowY: "auto", zIndex: '1'}}>
              <EditorPanel
                create_pile={this.create_pile}
                currentIssue={this.issueName}/>
            </div>
            <div
              style={{cursor:"pointer"}}
              onClick={(event) => {event.preventDefault();event.stopPropagation();this.state.userPilesList?this.setState({userPilesList: false}):this.setState({userPilesList: true})}}>
              {
                this.state.userPilesList &&
                <ModalBox>
                  <UserPilesList
                    allepiles={this.props.allepiles}
                    currentIssue={this.issueName}
                    attach_pile={this.attach_pile_issue}/>
                </ModalBox>
              }
              PullPile
            </div>
          </div>
        }
        {
          this.state.creatingState &&
          <div style={{width: "50%", height: "45%", position: "fixed", top: "18%", left: "28%", backgroundColor: "#FFFFFF", boxShadow: "0 0 8px 2px"}}>
            <h3>{this.issueName}</h3>
          </div>
        }
        <span style={{cursor: "pointer"}} onClick={(event) => {event.preventDefault();event.stopPropagation();this.state.creatingState?this.setState({creatingState: false}):this.setState({creatingState: true})}}>Creating</span>
        <ul style={{width: "80%", maxHeight: "85vh", padding: '0', position: "absolute", top: '40%', left: "3%", transform: "translate(0, -40%)", listStyle: "none", overflow: "auto"}}>
          {this.state.issuePiles}
        </ul>
      </section>
    )
  }
}

class UserPilesList extends React.Component {
  constructor(props){
    super(props);
    this.state = {

    };
    this.attach_pile = this.attach_pile.bind(this);
  }

  attach_pile(event) {
    event.preventDefault();
    event.stopPropagation();
    let id = $(event.target).attr('data-id-pile');
    this.props.attach_pile(id);
  }

  render(){
    let issueName = this.props.currentIssue;
    let attach_pile = this.attach_pile;
    let piles = [];
    $.each(this.props.allepiles, function(key, value){
      piles.unshift(
        <li
          key={"key_"+issueName+String(value.id)}
          id={"id_"+issueName+String(value.id)}
          style={{width: "90%", height: "33%", margin: "2% 1%", padding: "0 1%", position: "relative", overflowY: "hidden", boxShadow: "0 0 5px"}}>
         <UrlPreview
            contentType={value.contentType}
            previewState={value.urlSiteInfo}
            />
          <DisplayEditor
            className=''
            rawContent={value.rawContent}/>
          <span
            data-id-pile={value.id}
            style={{position: "absolute", bottom: "2%", right: "5%", cursor: "pointer"}}
            onClick={attach_pile}>attach</span>
        </li>
      );
    });

    return(
      <ul style={{width: "25%", height: "65%", position: "fixed", left: "25%", top: "15%", backgroundColor: "#FFFFFF", boxShadow: "0 0 5px 2px", listStyle: "none"}}>
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
