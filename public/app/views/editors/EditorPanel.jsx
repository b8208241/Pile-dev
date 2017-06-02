import React from 'react';
import {connect} from 'react-redux';
import MainEditor from './MainEditor.jsx';
import AttachedEditor from './AttachedEditor.jsx';
import UrlPreview from '../generals/UrlPreview.jsx';
import {EditorState, ContentState, convertToRaw, convertFromRaw, Modifier} from 'draft-js';
import createHashtagPlugin from 'draft-js-hashtag-plugin';
import createLinkifyPlugin from 'draft-js-linkify-plugin';
import {pluginsDecoratorCreate} from '../generals/draft/pluginsDecoratorCreate.jsx';

const linkifyPlugin = createLinkifyPlugin({target: '_blank'});
const hashtagPlugin = createHashtagPlugin();
const pluginDecorators = pluginsDecoratorCreate([linkifyPlugin, hashtagPlugin]);
const pluginDecoratorsOnlyLink = pluginsDecoratorCreate([linkifyPlugin]);

export default class EditorPanel extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      mainEditorState: EditorState.createEmpty(pluginDecoratorsOnlyLink),
      tagsEditorState: EditorState.createEmpty(pluginDecorators),
      issuesEditorState: EditorState.createEmpty(pluginDecorators),
      previewState: {},
      contentType: null,
      noneText: {build: '', value: ''}
    };
    this.changeMainEditorState = (newState) => this.setState({mainEditorState: newState});
    this.changeTagsEditorState = (newState) => this.setState({tagsEditorState: newState});
    this.changeIssueEditorState = (newState) => this.setState({issuesEditorState: newState});
    this.set_contentType = (contentType) => this.setState({contentType: contentType});
    this.set_noneTextState = (build, link) => this.setState({noneText: {build: build, value: link}});
    this.set_noneTextData = (previewData, contentType) => this.setState({previewState: previewData, contentType: contentType});
    this.handle_Click_IssueEditor = this.handle_Click_IssueEditor.bind(this);
    this.handle_Click_Create = this.handle_Click_Create.bind(this);
  }

  handle_Click_IssueEditor(event){
    event.preventDefault();
    event.stopPropagation();
    const currentContentState = this.state.issuesEditorState.getCurrentContent();
    const currentSelection = this.state.issuesEditorState.getSelection();
    const modifiedContentState = Modifier.insertText(currentContentState, currentSelection, "[]");
    const modifiedEditorState = EditorState.push(this.state.issuesEditorState, modifiedContentState, 'insert-text')
    const modifieSelectionState = modifiedEditorState.getSelection();
    this.changeIssueEditorState(
      EditorState.forceSelection(
        modifiedEditorState,
        modifieSelectionState.merge({focusOffset: 1, anchorOffset: 1})
      )
    )
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
    let issueArr = [];
    let issueText = this.state.issuesEditorState.getCurrentContent().getPlainText()
    if(issueText.length !== 0){
      let issueName = issueText.slice(1, (issueText.length)-1)
      issueArr.push(issueName)
      if(this.props.currentIssue){
          let currentIssue = $('#issueEditor_currentIssue').text();
          issueArr.push(currentIssue)
      }
    }

    this.props.create_pile(
      rawContent,
      previewState,
      "pile_"+time,
      time,
      this.state.contentType,
      tagArr,
      issueArr);
    this.setState({
      mainEditorState: EditorState.push(this.state.mainEditorState, ContentState.createFromText('')),
      tagsEditorState: EditorState.push(this.state.tagsEditorState, ContentState.createFromText('')),
      issuesEditorState: EditorState.push(this.state.issuesEditorState, ContentState.createFromText('')),
      previewState: {},
      contentType: null,
      noneText: {build: '', value: ''}
    });
  }

  componentDidMount(){

  }

  render() {
    let noneTextPreview = []
    ,set_noneTextData = this.set_noneTextData
    ,state = this.state;
    switch (this.state.noneText.build) {
      case "url":
        noneTextPreview.push(
          <div key="key_urlpreview" style={{backgroundColor: "#FFFFFF"}}>
            <UrlPreview
              contentType={state.contentType}
              urlValue={state.noneText.value}
              previewState={state.previewState}
              set_noneTextData={set_noneTextData}
              />
          </div>
        )
        break;
      default:
        break;
    };

    return(
      <div style={{backgroundColor: "#555555"}}>
        <span>{this.state.contentType}</span>
        {noneTextPreview}
        <div style={{padding: "0.5vh 0", marginBottom: "2%", backgroundColor: "#FFFFFF"}}>
          <MainEditor
            editorState={this.state.mainEditorState}
            changeEditorState={this.changeMainEditorState}
            previewState={this.state.previewState}
            set_noneTextState={this.set_noneTextState}
            set_contentType={this.set_contentType}
            />
        </div>
        {
          this.props.currentIssue &&
          <div id="issueEditor_currentIssue" style={{backgroundColor: "FFFFFF"}}>
            {this.props.currentIssue}
          </div>
        }
        <div style={{padding: "0.3vh 0", marginBottom: "2%", backgroundColor: "#FFFFFF"}} onClick={this.handle_Click_IssueEditor}>
          <AttachedEditor
            editorState={this.state.issuesEditorState}
            changeEditorState={this.changeIssueEditorState}
            />
        </div>
        <div style={{padding: "0.3vh 0", marginBottom: "2%", backgroundColor: "#FFFFFF"}}>
          <AttachedEditor
            editorState={this.state.tagsEditorState}
            changeEditorState={this.changeTagsEditorState}/>
        </div>
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
