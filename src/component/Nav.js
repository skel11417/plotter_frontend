import React from 'react'
import ModalContainer from '../container/ModalContainer'
import {Button, Icon} from 'semantic-ui-react'
const Nav = (props) => {
  const style = {}
  props.plotId ? style.display = '' : style.display = 'none'
  props.saved ? style.backgroundColor = 'green' : style.backgroundColor = 'grey'

  return (
    <nav style={{backgroundColor: 'black',
        color: 'white',
        height: 'auto'}} >
      <h1>Stage Plotter</h1>
      <Button secondary size="mini" style={style} onClick={props.savePlot}>
        <Icon name="save"/>Save Plot</Button>
      <Button style={{display: 'inline'}} primary size='mini'  onClick={props.showPDF}>
        <Icon name='download' />
          Export as PDF
      </Button>
      {props.plotId ? <ModalContainer slug={props.slug}/> :null }
    </nav>
  )
}

export default Nav
