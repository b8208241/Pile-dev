import React from 'react';

export default class UrlPreview extends React.Component {
  constructor(props){
    super(props);
    this.state = {

    };
    this.set_urlPreivew = this.set_urlPreivew.bind(this);
  }

  set_urlPreivew(data, resType) {
    let previewData, contentType;
    switch (resType) {
        case "web":
          previewData = {title: data.title, url: data.url, description: data.description, img: data.img};
          contentType = "web";
          break;
        case "image":
          previewData = {img: data.img}
          contentType = "image";
          break;
        case "file-pdf":
          previewData = {fileHost: data.fileHost, embed: data.embed}
          contentType = "file-pdf";
          break;
        case "unclear":
          previewData = {title: data.title};
          contentType = "web";
          break;
        default:
          previewData = {};
          contentType = "web";
          break;
    }
    this.props.set_urlPreivew(previewData, contentType);
  }

  componentDidMount(){
    console.log("UrlPreview did mount")
    if(this.props.urlValue){
      reqSite("preview", this.props.urlValue, this.set_urlPreivew);
    }
  }

  componentDidUpdate(){

  }

  render(){
    let children = [];
    switch (this.props.contentType) {
      case "web":
        children.push(
          <div key="key_urlpreview_web">
            {
              this.props.previewState.img &&
              <img src={this.props.previewState.img} style={{maxWidth: "80%", height: "auto"}}/>
            }
            <h4>{this.props.previewState.title}</h4>
            {
              this.props.previewState.description &&
              <p>{this.props.previewState.description}</p>
            }
            <a href={this.props.previewState.url} target="_blank">{this.props.previewState.url}</a>
          </div>
        )
        break;
      case "image":
        children.push(
          <div key="key_urlpreview_image">
            <img src={this.props.previewState.img} style={{maxWidth: "80%", height: "auto"}}/>
          </div>
        )
        break;
      case "file-pdf":
        children.push(
          <div key="key_urlpreview_image">
            <h4>{this.props.previewState.fileHost}</h4>
            <embed type="application/pdf" src={this.props.previewState.embed}/>
          </div>
        )
      default:
        break;
    }
    return(
      <div>
        {children}
      </div>
    )
  }
}

function reqSite(purpose, url, callBack) {
  axios.get("/url/"+purpose+"?url="+url).then(
    function(res){
      console.log(res)
      res.data ? callBack(res.data, res.data.contentType) : callBack('', '')
    }
  )
}
