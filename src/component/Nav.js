import React from 'react'

const Nav = (props) => {
  return (
    <nav>
      <h1>This is the nav</h1>
      <button onClick={props.savePlot}>Button</button>
    </nav>
  )
}

export default Nav
