import React, {Component} from 'react'
import {Modal} from 'semantic-ui-react'
import Toolbar from '../container/Toolbar'

class ItemSelector extends Component {
  state = {
    open: true
  }

  closeToolbar = () =>{
    this.props.closeToolbar()
  }

  render(){
    const {toolbarOpen, closeToolbar, itemList, addItemToStage} = this.props

    return (
      <>
        <Modal size={'large'} open={toolbarOpen}   onClose={closeToolbar}>
          <Modal.Header>Select Your Item</Modal.Header>
          <Modal.Content>
            <Toolbar
              itemList={itemList}
              addItemToStage={addItemToStage}
              closeToolbar={closeToolbar}
            />
          </Modal.Content>
        </Modal>
      </>
    )
  }
}

export default ItemSelector
