import React, {Component} from 'react'

class Toolbar extends Component {

  render(){
    return (
      <div id="toolbar">
        {this.props.itemList.map(item =>
          <img
            key={item.id}
            alt={item.name}
            src={require(`../icons/${item.image}`)} style={{display: 'inline', height: '80px'}} onClick={() => {
              this.props.addItemToStage(item)
              this.props.closeToolbar()
              }
            }/>)}
      </div>
    )
  }
}

export default Toolbar
