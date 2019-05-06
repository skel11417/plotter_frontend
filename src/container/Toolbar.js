import React, {Component} from 'react'
// import Icon from '../component/Icon.js'

class Toolbar extends Component {

  render(){
    return (
      <div id="toolbar">
        {this.props.itemList.map(item =>
          <img
            key={item.id}
            alt={item.name}
            src={require(`../icons/${item.image}`)} style={{display: 'inline', height: '80px'}} onDoubleClick={() => this.props.addItemToStage(item)}/>)}
      </div>
    )
  }
}

export default Toolbar
