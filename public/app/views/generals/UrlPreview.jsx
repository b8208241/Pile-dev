import React from 'react';

export default class UrlPreview extends React.Component {
  constructor(props){
    super(props);
    this.state = {

    };
    this.set_noneTextData = this.set_noneTextData.bind(this);
  }

  set_noneTextData(data, contentType) {
    let previewData;
    switch (contentType) {
        case "web":
          previewData = {title: data.title, url: data.url, description: data.description, img: data.img};
          break;
        case "image":
          previewData = {img: data.img}
          break;
        case "file-pdf":
          previewData = {fileHost: data.fileHost, icon: "http://www.freeiconspng.com/uploads/pdf-icon-png-pdf-zum-download-2.png"}
          break;
        default:
          previewData = {title: data.title};
          break;
    }
    this.props.set_noneTextData(previewData, contentType);
  }

  componentDidMount(){
    console.log("UrlPreview did mount")
    if(this.props.urlValue){
      reqSite("preview", this.props.urlValue, this.set_noneTextData);
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
            <p>{this.props.previewState.description}</p>
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
            <img src={this.props.previewState.icon} style={{Width: "35%", height: "auto"}}/>
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
      if(res.data){
        callBack(res.data, res.data.contentType)
      }
    }
  )
}
