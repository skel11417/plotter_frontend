import React from 'react'
import ModalContainer from '../container/ModalContainer'
import {Button, Icon} from 'semantic-ui-react'
const Nav = (props) => {
  // const style = {}
  // props.plotId ? style.display = 'inline' : style.display = 'none'

  return (
    <nav style={{backgroundColor: 'black',
        color: 'white',
        height: '100px',
        padding: '10px'}} >
      <h1 style={{fontSize: '2.5em'}}>Stage Plotter</h1>
      {props.plotId ?
        <div>
        <Button secondary size="mini" style={{display: 'none'}} onClick={props.savePlot}>
          <Icon name="save"/>Save Plot</Button>
        <Button style={{display: 'inline'}} primary size='mini'  onClick={props.showPDF}>
          <Icon name='download' />
            Export as PDF
        </Button>
        <ModalContainer slug={props.slug}/>
        </div>
        :
        <div style={{fontSize: '1.5em'}}>
          Click the stage to get started.
        </div>
       }
    </nav>
  )
}

export default Nav
