import React from 'react'
class Draggable extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      pos: this.props.initialPos,
      dragging: false,
      rel: null // position relative to the cursor
    }
  }

  static defaultProps = {
    initialPos: {x: 0, y: 0}
  }
  // we could get away with not having this (and just having the listeners on
  // our div), but then the experience would be possibly be janky. If there's
  // anything w/ a higher z-index that gets in the way, then you're toast,
  // etc.
  //
  // MAY NEED THIS
  //

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

    // let pos = e.nativeEvent.target.getBoundingClientRect()
    //Conditional logic to move element
    console.log(pos, e.pageX, e.pageY)
    this.setState({
      dragging: true,
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
    e.stopPropagation()
    e.preventDefault()
  }

  onMouseMove = (e) => {
    if (!this.state.dragging) return
    // let newPos = {}
      this.setState({
        pos: {
          x: e.pageX - this.state.rel.x,
          y: e.pageY - this.state.rel.y
        }
      })
      e.stopPropagation()
      e.preventDefault()
  }

  render(){
    // transferPropsTo will merge style & other props passed into our
    // component to also be on the child DIV.
    // console.log(this.state.pos.x, this.state.pos.y)
    const style = {
        position: 'relative',
        left: this.state.pos.x + 'px',
        top: this.state.pos.y + 'px',
        width: '200px',
        height: '200px',
        backgroundColor: "#cca"
      }
    return <div
      cursor="pointer"
      position='relative'
      ref={this.refCallback}
      pos={this.state.pos}
      onMouseDown={this.onMouseDown}
      onMouseUp={this.onMouseUp}
      onMouseMove={this.onMouseMove}
      style={style}>Hey</div>
  }
}
export default Draggable
