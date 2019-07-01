import React, {Component} from 'react'

class StaticItem extends Component {
  render(){
    const style = {
        position: 'absolute',
        left: this.props.position.x + 'px',
        top: this.props.position.y + 'px',
        float: 'left'
      }

    return <img
      cursor="pointer"
      alt="mic"
      src={require(`../icons/${this.props.item.image}`)}
      className = {this.props.item.name}
      style={style}></img>
  }
}

export default StaticItem
