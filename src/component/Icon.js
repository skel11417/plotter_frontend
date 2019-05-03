import React from 'react'
import ReactDom from 'react-dom'
import Draggable from 'react-draggable'

const Icon = ({item, onAddItem}) => {

  const style = {
    height: '100px',
//    position: 'absolute', bottom: `${item.y}px`, right: `${item.x}px`
  }

  return (
    <Draggable
      bounds='parent'
      onMouseDown={e=> e.preventDefault()}
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
