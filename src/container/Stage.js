import React, {Component} from 'react'
import Icon from '../component/Icon'
import Draggable from '../component/Draggable'

class Stage extends Component {
  style = {
    border: 'black 1px solid',
    minHeight: '300px',
    position: 'relative',
    width: '600px',
    marginLeft: '20px'
  }

  // render(){
  //   return (
  //     <div id="parent" style={this.style}>
  //     {this.props.itemsOnStage.map((item) =>
  //       <Icon
  //         key={item.uuid}
  //         index={item.uuid}
  //         item={item}
  //         onAddItem={this.props.addItemToStage}
  //         onMouseUp={this.props.updateItemPos}
  //       />)}
  //     </div>
  // )
  // }

  render(){
    return (
      <div id="parent" style={this.style}>
      <Draggable
        className='my-draggable'
        style={{
        border: '2px solid #aa5',
        padding: '10px'}
        }
        />
        </div>
      )
  }
}

export default Stage
