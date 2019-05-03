import React, {Component} from 'react'
import Icon from '../component/Icon'

class Stage extends Component {
  style = {
    border: 'black 1px solid',
    minHeight: '400px',
    position: 'relative',
    width: '800px'
  }

  render(){
    return (
      <div id="parent" style={this.style}>
      {this.props.itemsOnStage.map((item) =>
        <Icon
          key={item.uuid}
          index={item.uuid}
          item={item}
          onAddItem={this.props.addItemToStage}
          onMouseUp={this.props.updateItemPos}
        />)}
      </div>
  )
  }
}

export default Stage
