import React, {Component} from 'react'
import Icon from '../component/Icon'

class Stage extends Component {
  style = {
    border: 'black 1px solid',
    minHeight: '400px'
  }

  render(){
    return (
      <div id="stage" style={this.style}>
      {this.props.itemsOnStage.map(item =>
        <Icon
          key={item.id}
          item={item}
          onAddItem={this.props.addItemToStage}
        />)}
      </div>
  )
  }
}

export default Stage
