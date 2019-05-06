import React, {Component} from 'react'
// import Icon from '../component/Icon'
import Draggable from '../component/Draggable'

class Stage extends Component {

  state = {
    bounds: {top: 0, left: 0, bottom: 300, right: 600}
  }

  style = {
    border: 'black 1px solid',
    minHeight: '300px',
    position: 'relative',
    width: '600px',
    marginLeft: '20px'
  }

  render(){
    return (
      <div id="parent" style={this.style}>
      {this.props.itemsOnStage.map(item =>
        <Draggable
          item={item}
          key={item.id}
          initialPos={{x: item.x, y: item.y}}
          bounds={this.state.bounds}
          updateItemPos={this.props.updateItemPos}
          style={{
            border: '2px solid #aa5',
            padding: '10px'}
          }
        />
      )
    }
    </div>
  )
  }
}

export default Stage
