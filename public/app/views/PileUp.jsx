import React from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router';
import MainEditor from './editors/MainEditor.jsx';
import AttachedEditor from './editors/AttachedEditor.jsx';
import UrlPreview from './generals/UrlPreview.jsx';
import {pluginsDecoratorCreate} from './generals/draft/pluginsDecoratorCreate.jsx';
import {pileSubmit} from '../reduxsaga/dispatch.js';
import {EditorState, ContentState, convertToRaw, convertFromRaw} from 'draft-js';
import createHashtagPlugin from 'draft-js-hashtag-plugin';
import createLinkifyPlugin from 'draft-js-linkify-plugin';

const linkifyPlugin = createLinkifyPlugin({target: '_blank'});
const hashtagPlugin = createHashtagPlugin();
const pluginDecorators = pluginsDecoratorCreate([linkifyPlugin, hashtagPlugin]);
const pluginDecoratorsOnlyLink = pluginsDecoratorCreate([linkifyPlugin]);

class PileUp extends React.Component {
  constructor(props){
    super(props);
    this.state = {

    };
    this.create_pile = this.create_pile.bind(this);
  }

  create_pile(rawContent, urlSiteInfo, id, time, tagArr) {
    this.props.dispatch(pileSubmit({rawContent: rawContent, urlSiteInfo: urlSiteInfo, id: id, time: time, tagArr: tagArr}));
  }

  render() {
    let allepiles = this.props.allepiles;
    let tags = this.props.tags;
    let status = this.props.status;
    let others = this.props.others;
    let children = React.Children.map(this.props.children, function (child) {
      return React.cloneElement(
        child,
        {
          allepiles: allepiles,
          tags: tags,
          status: status,
          others: others
        }
      )
    })
    return(
      <section style={{fontSize: "16px", fontFamily: "'Noto Sans TC', Helvetica, '微軟正黑體', sans-serif"}}>
        <div style={{width: "25%", position: "fixed", top: "20%", left: "25%", backgroundColor: "#FFFFFF", textAlign: "left", zIndex: '1'}}>
          <Link to="/" activeStyle={{textDecoration: "none", color: "black"}}><p><span style={{fontSize: "2.5rem", fontWeight: "bold", letterSpace: "0.5rem", lineHeight: "1rem"}}>User Me</span></p></Link>
        </div>
        <div style={{width: "25%", position: "fixed", top: "20%", left: "50%", backgroundColor: "#FFFFFF", zIndex: '1'}}>
          <EditorPanel
            create_pile={this.create_pile}/>
        </div>
        <TagPanel
          tags={this.props.tags}/>
        {children}
      </section>
    )
  }
}

class TagPanel extends React.Component {
  constructor(props){
    super(props);
    this.state = {

    };
  }

  render() {
    let directory = []
    $.each(this.props.tags, function(key, value){
      directory.unshift(
        <li
          key={key+"_"+value.include.length}
          style={{listStyle: "none"}}>
          <Link to={key} activeStyle={{textDecoration: "none", color: "black"}}>
            {key}
          </Link>
        </li>
      );
    })
    return(
      <div style={{position: "fixed", top: "30%", left: "55%", backgroundColor: "#FFFFFF"}}>
        {directory}
      </div>
    )
  }
}

class EditorPanel extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      mainEditorState: EditorState.createEmpty(pluginDecoratorsOnlyLink),
      attachedEditorState: EditorState.createEmpty(pluginDecorators),
      previewState: {},
      urlExist: false,
      urlValue: ''
    };
    this.changeMainEditorState = (newState) => this.setState({mainEditorState: newState});
    this.changeAttachedEditorState = (newState) => this.setState({attachedEditorState: newState});
    this.set_UrlState = (link) => this.setState({urlExist: true, urlValue: link})
    this.handle_Click_Create = this.handle_Click_Create.bind(this);
    this.set_previewState = this.set_previewState.bind(this);
  }

  set_previewState(data) {
    this.setState({previewState: data});
  }

  handle_Click_Create(event){
    event.preventDefault();
    event.stopPropagation();
    let rawContent = convertToRaw(this.state.mainEditorState.getCurrentContent());
    let previewState = this.state.previewState;
    let date = new Date();
    let time = date.getTime();
    let tagArr = [];
    $(".draftJsHashtagPlugin__hashtag__1wMVC span>span").each(
      function(index){
        let tagText = $(this).text();
        tagArr.push(tagText.substring(1));
      }
    )

    this.props.create_pile(
      rawContent,
      previewState,
      "pile_"+time,
      time,
      tagArr);
    this.setState({
      mainEditorState: EditorState.push(this.state.mainEditorState, ContentState.createFromText('')),
      attachedEditorState: EditorState.push(this.state.attachedEditorState, ContentState.createFromText('')),
      previewState: {},
      urlExist: false,
      urlValue: ''
    });
  }

  render() {
    return(
      <div>
        {
          this.state.urlExist &&
          <UrlPreview
            urlValue={this.state.urlValue}
            previewState={this.state.previewState}
            set_previewState={this.set_previewState}
            />
        }
        <MainEditor
          editorState={this.state.mainEditorState}
          changeEditorState={this.changeMainEditorState}
          previewState={this.state.previewState}
          set_UrlState={this.set_UrlState}
          />
        <AttachedEditor
          editorState={this.state.attachedEditorState}
          changeEditorState={this.changeAttachedEditorState}/>
        <input
          value="create"
          type="button"
          style={{}}
          onClick={this.handle_Click_Create}
          />
      </div>
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
  PileUp
)
