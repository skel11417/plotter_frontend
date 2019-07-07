import React, {Component} from 'react'
import {Popup} from 'semantic-ui-react'
class Toolbar extends Component {

  parseName = (itemName) => {
    return itemName.replace(/-/g, " ").replace(/\w\S*/g, text =>  text.charAt(0).toUpperCase() + text.substr(1)).replace("Di", "DI")
  }

  render(){
    return (
      <div id="toolbar">
        {this.props.itemList.map(item =>
          <Popup
            content={this.parseName(item.name)}
            trigger={
              <img
              key={item.id}
              alt={item.name}
              src={require(`../icons/${item.image}`)} style={{display: 'inline', height: '80px'}} onClick={() => {
                this.props.addItemToStage(item)
                this.props.closeToolbar()
              }
              }/>
            }/>
          )}
      </div>
    )
  }
}

export default Toolbar
