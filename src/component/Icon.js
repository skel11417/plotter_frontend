import React from 'react'
import ReactDom from 'react-dom'
import Draggable from 'react-draggable'

const Icon = ({item, onAddItem}) => {
  const style = {
    height: '100px'
  }

  return (
    <Draggable
    //  grid={[25, 25]}
      bounds='parent'
      defaultPosition={{x: 0, y: 0}}>
        <img
          alt="mic"
          src={require(`../icons/${item.image}`)}
          style={style}
          />
      </Draggable>
    )
}

export default Icon
