import React from 'react';
import {pluginsDecoratorCreate} from '../generals/draft/pluginsDecoratorCreate.jsx';
import {Editor, EditorState, convertToRaw, convertFromRaw, ContentState} from 'draft-js';
import createHashtagPlugin from 'draft-js-hashtag-plugin';
import createLinkifyPlugin from 'draft-js-linkify-plugin';
const linkifyPlugin = createLinkifyPlugin({target: '_blank'});
const hashtagPlugin = createHashtagPlugin();
const pluginDecorators = pluginsDecoratorCreate([linkifyPlugin, hashtagPlugin]);

export default class DisplayEditor extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      editorState: null
    };
    this.changeeditorState = () => {};
  }

  componentWillMount(){
    const firstBlock = convertFromRaw(this.props.rawContent).getFirstBlock();
    const contentStateOnlyFirstBlock = ContentState.createFromBlockArray([firstBlock]);
    this.setState({editorState: EditorState.createWithContent(contentStateOnlyFirstBlock, pluginDecorators)})
  }

  render() {
    return (
      <div className={this.props.className}>
        <Editor
          editorState={this.state.editorState}
          onChange={this.changeeditorState}
          readOnly
          />
      </div>
    )
  }
}
