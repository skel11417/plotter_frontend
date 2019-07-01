import React, {Component} from 'react'
import {Button, Modal, Icon, Input} from 'semantic-ui-react'
import Toolbar from '../container/Toolbar'

class ItemSelector extends Component {
  state = {
    open: true
  }

  closeToolbar = () =>{
    this.props.closeToolbar()
  }

  render(){
    const {toolbarOpen, closeToolbar} = this.props

    return (
      <>
        <Modal size={'large'} open={toolbarOpen}   onClose={closeToolbar}>
          <Modal.Header>Select Your Item</Modal.Header>
          <Modal.Content>
            <Toolbar itemList={this.props.itemList}/>
          </Modal.Content>
        </Modal>
      </>
    )
  }
}

export default ItemSelector
