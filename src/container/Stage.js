import React, {Component} from 'react'
import Draggable from '../component/Draggable'

class Stage extends Component {

  state = {
    bounds: {top: 0, left: 0, bottom: 600, right: 1000}
  }

  style = {
    border: 'black 1px solid',
    minHeight: '600px',
    position: 'relative',
    width: '1000px',
    marginLeft: '20px'
  }

  clickHandler = (e) => {
    let sampleItem = this.props.itemList[0]
    if (e.target.id === "parent") {
      this.props.openToolbar()
      this.props.setClickPosition(e.nativeEvent.offsetX, e.nativeEvent.offsetY)
    }
  }

  render(){
    return (
      <div id="parent" onClick={(e)=>this.clickHandler(e)} style={this.style}>
      {this.props.itemsOnStage.map(item =>
        <Draggable
          item={item}
          key={item.items_plots_id}
          initialPos={{x: item.x, y: item.y}}
          bounds={this.state.bounds}
          deleteItem={this.props.deleteItem}
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
