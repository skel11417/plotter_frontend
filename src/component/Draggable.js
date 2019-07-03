import React from 'react'
import '../PDFItem.css'
class Draggable extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      pos: this.props.initialPos,
      dragging: false,
      rel: {}, // position relative to the cursor
      width: 0,
      height: 0
    }
  }

  static defaultProps = {
    initialPos: {x: 0, y: 0}
  }
  // we could get away with not having this (and just having the listeners on
  // our div), but then the experience would be possibly be janky. If there's
  // anything w/ a higher z-index that gets in the way, then you're toast,
  // etc.

  componentDidUpdate(props, state) {
    if (this.state.dragging && !state.dragging) {
      document.addEventListener('mousemove', this.onMouseMove)
      document.addEventListener('mouseup', this.onMouseUp)
    } else if (!this.state.dragging && state.dragging) {
      document.removeEventListener('mousemove', this.onMouseMove)
      document.removeEventListener('mouseup', this.onMouseUp)
    }
  }

  // calculate relative position to the mouse and set dragging=true
  onMouseDown = (e) => {
    // only left mouse button
    if (e.button !== 0) return
    const pos = {
      top: e.nativeEvent.target.offsetTop,
      left: e.nativeEvent.target.offsetLeft
    }
    // This is janky but it does the job
    const clientRect = e.nativeEvent.target.getBoundingClientRect()

    //Conditional logic to move element
    this.setState({
      dragging: true,
      width: clientRect.width,
      height: clientRect.height,
      rel: {
        x: e.pageX - pos.left,
        y: e.pageY - pos.top
      }
    })
    e.stopPropagation()
    e.preventDefault()
  }

  onMouseUp = (e) => {
    this.setState({dragging: false})
    // update the state in App
    this.props.updateItemPos({
      pos: this.state.pos,
      id: this.props.item.items_plots_id
    })

    e.stopPropagation()
    e.preventDefault()
  }

  constrainBounds = (pos) => {
    const {height, width} = this.state
    const bounds = {
      right: this.props.bounds.right - width,
      bottom: this.props.bounds.bottom - height
    }
    if (pos.x <= 0) {
      pos.x = 0
    }
    if (pos.x >= bounds.right) {
      pos.x = bounds.right
    }
    if (pos.y <= 0) {
      pos.y = 0
    }
    if (pos.y >= bounds.bottom){
      pos.y = bounds.bottom
    }
  }

  onMouseMove = (e) => {
    if (!this.state.dragging) return
    let newPos = {
      x: e.pageX - this.state.rel.x,
      y: e.pageY - this.state.rel.y
    }
      // check the bounds of the new position
      this.constrainBounds(newPos)

      this.setState({
        pos: {
          x: newPos.x,
          y: newPos.y
        }
      })
      e.stopPropagation()
      e.preventDefault()
  }

  render(){
    const style = {
        position: 'absolute',
        left: this.state.pos.x + 'px',
        top: this.state.pos.y + 'px',
        float: 'left'
      }

    return <img
      cursor="pointer"
      alt="mic"
      src={require(`../icons/${this.props.item.image}`)}
      

      pos={this.state.pos}

      onMouseDown={this.onMouseDown}
      onMouseUp={this.onMouseUp}
      onMouseMove={this.onMouseMove}
      onDoubleClick={()=>this.props.deleteItem(this.props.item)}
      style={style}></img>
  }
}
export default Draggable
