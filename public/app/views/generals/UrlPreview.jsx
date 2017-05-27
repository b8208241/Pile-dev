import React from 'react';

export default class UrlPreview extends React.Component {
  constructor(props){
    super(props);
    this.state = {

    };
    this.set_PreviewState = this.set_PreviewState.bind(this);
  }

  set_PreviewState(data) {
    this.props.set_previewState({title: data.title, url: data.url, description: data.description, img: data.img});
  }

  componentDidMount(){
    console.log("UrlPreview did mount")
    if(this.props.urlValue){
      reqSite("preview", this.props.urlValue, this.set_PreviewState);
    }
  }

  componentDidUpdate(){
    console.log('UrlPreview did update')
  }

  render(){
    return(
      <div>
        <h4>{this.props.previewState.title}</h4>
        <p>{this.props.previewState.description}</p>
        {
          this.props.previewState.img &&
          <img src={this.props.previewState.img} style={{maxWidth: "80%", height: "auto"}}/>
        }
        <a href={this.props.previewState.url}>{this.props.previewState.url}</a>
      </div>
    )
  }
}

function reqSite(purpose, url, callBack) {
  axios.get("/req/"+purpose+"?url="+url).then(
    function(res){
      console.log(res)
      if(res.data){
        callBack(res.data)
      }
    }
  )
}
