import React from 'react'

const Nav = (props) => {
  return (
    <nav>
      <h1>Stage Plotter</h1>
      <button onClick={props.savePlot}>Save Plot</button>
    </nav>
  )
}

export default Nav
