
import React, {Component} from 'react';

class UtteranceEditorCell extends Component {
  render() {
    const { item } = this.props;
    return (
        <span className="decorator complete" style= {{backgroundColor: "red", paddingLeft: "5px"}} key={item.key}>
        <span data-offset-key="36ap2-2-0">
        <span data-text="true">{item.text}</span></span></span>
    )
  }
}

UtteranceEditorCell.defaultProps = {
  text: ''
}

export default UtteranceEditorCell;

