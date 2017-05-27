import React from 'react';

export class ModalBackground extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    const style = this.props.className ?　null : {
      width: "100%",
      height: "95%",
      position: "fixed",
      top: "5%",
      left: 0,
      backgroundColor: "rgba(156, 152, 152, 0.9)",
      zIndex: 5
    }

    return(
      <div className={this.props.className} style={style} onClick={this.props.onClose}>
        <div onClick={(event) => {event.preventDefault(); event.stopPropagation();}}>
          {this.props.children}
        </div>
      </div>
    )
  }
}
