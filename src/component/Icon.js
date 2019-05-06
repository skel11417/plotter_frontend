import React from 'react'
// import ReactDom from 'react-dom'
import Draggable from 'react-draggable'

const Icon = ({item, onMouseUp, index}) => {
  const style = {
    height: '100px'
  }

  return (
    <Draggable
      bounds='parent'
      onMouseDown={e=> e.preventDefault()}
      onStop={(pos)=>onMouseUp({pos, uuid: item.uuid})}
      defaultPosition={{x: item.x, y: item.y}}
        >
          <img
            alt="mic"
            src={require(`../icons/${item.image}`)}
            style={style}
            />
      </Draggable>
    )
}

export default Icon
