import React, {Component} from 'react'

class StaticItem extends Component {
  render(){
    const style = {
        position: 'absolute',
        left: this.props.position.x * 0.6 + 'px',
        top: this.props.position.y * 0.6 + 'px',
        float: 'left'
      }

    return <img
      cursor="pointer"
      alt="mic"
      className = {this.props.item.name}
      src={require(`../icons/${this.props.item.image}`)}
      className = {this.props.item.name}
      style={style}></img>
  }
}

export default StaticItem
