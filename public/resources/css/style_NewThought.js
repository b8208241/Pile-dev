function _viewMember(){

}

function _neighbor(rowVar, columnVar){
  let horizontalPosition = 50+(columnVar*32);
  let verticalPosition = 50+(rowVar*33);
  return({
    width: "30.5%",
    height: "30.5%",
    position: "absolute",
    top: verticalPosition+"%",
    left: horizontalPosition+"%",
    transform: "translate(-50%, -50%)"
  })
}

const style_NewThought = {
  newThought: {
    width: "40%",
    height: "100%",
    position: "absolute",
    top: "0",
    left: "50%",
    transform: "translate(-50%, 0)"
  },
  optionPanel: {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: "0",
    left: "0"
  },
  noteOption: {
    width: "35%",
    height: "10%",
    position: "absolute",
    top: "60%",
    left: "50%",
    transform: "translate(-50%, 0)",
    boxSizing: "border-box",
    borderBottom: "0.2vh solid #9C9898",
    cursor: "text"
  },
  buttonOption: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "20%",
    position: "absolute",
    top: "40%",
    left: "50%",
    transform: "translate(-50%, 0)"
  },
  buttonOption_editing: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "75%",
    height: "10%",
    position: "absolute",
    top: "3%",
    left: "60%",
    transform: "translate(-50%, 0)"
  },
  newThought_Editing: {
    width: "64%",
    minHeight: "42%",
    maxHeight: "72.25%",
    position: "absolute",
    top: "15%",
    left: "18%",
    overflow: "visible"
  },
  inputPanel: {
    width: "100%",
    position: "relative",
    overflow: "visible",
    zIndex: "0"
  },
  inputPanel_CurrentEditing: {
    width: "100%",
    position: "relative",
    zIndex: "0"
  },
  inputPanel_neighborWindow: {
    width: "144%",
    height: "144%",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    overflow: "hidden",
    zIndex: "-1"
  },
  inputPanel_neighborCommunity: {
    width: "228%",
    height: "228%",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)"
  },
  inputPanel_neighbor: _neighbor,
  input_Note: {
    minHeight: "38vh",
    padding: "2%",
    boxSizing: "border-box",
    backgroundColor: "rgb(255, 255, 200)",
    boxShadow: "1px 1px 5px 1px",
    cursor: "text"
  },
  input_PasteCard: {
    width: "35%",
    minHeight: "35vh",
    maxHeight: "50vh",
    backgroundColor: "#FFFFFF",
    boxShadow: "0px 0px 5px 1px",
    overflowY: "auto"
  },
  newThought_View: {
    maxWidth: "200%",
    maxHeight: "90%",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    overflow: "visible"
  },
  viewPanel_member_Note: {
    width: "100%",
    height: "100%",
    boxSizing: "border-box",
    backgroundColor: "rgb(255, 255, 200)",
    boxShadow: "0 0 5px",
    overflow: "hidden",
    fontSize: "0.5rem"
  },
  controllPanel_View: {
    display: "inline-block",
    width: "20%",
    position: "absolute",
    top: "100%",
    left: "80%",
    zIndex: "1"
  },
  controllPanel_Editing: {
    display: "inline-block",
    width: "20%",
    position: "absolute",
    top: "122%",
    left: "106%",
    zIndex: "1"
  },
  controllPanel_submit: {
    fontWeight: "bold",
    fontSize: "3vh",
    color: "#9C9898",
    cursor: "pointer"
  },
  controllPanel_edit: {
    fontWeight: "bold",
    fontSize: "3vh",
    color: "#9C9898",
    cursor: "pointer"
  },
  controllPanel_viewWhole: {
    fontWeight: "bold",
    fontSize: "3vh",
    color: "#9C9898",
    cursor: "pointer"
  },
  controllPanel_giveup: {
    cursor: "pointer"
  },
  svg_buttonOption: {
    width: "16%",
    height: "100%",
    margin: "0 2%",
    cursor: "pointer"
  }
}

export default style_NewThought
