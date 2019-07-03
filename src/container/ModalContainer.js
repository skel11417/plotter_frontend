import React, {Component} from 'react'
import {Button, Modal, Icon, Input} from 'semantic-ui-react'
import {CopyToClipboard} from 'react-copy-to-clipboard';

class ModalContainer extends Component {
  state = {
    open: false,
    url: 'http://localhost:3001/' + this.props.slug,
    copied: false,
  }

  show = size => () => this.setState({ size, open: true })
  close = () => this.setState({ open: false })
  copyAndClose = () => {
    this.setState({copied: true})
    setTimeout(this.close, 1000)
  }

  render(){
    const { open, size, url } = this.state
    return (
      <>
        <Button style={{display: 'inline'}} primary size='mini'  onClick={this.show('mini')}>
          <Icon name='bookmark' />
            Share
        </Button>
        <Modal size={size} open={open} onClose={this.close}>
          <Modal.Header>Share your plot</Modal.Header>
          <Modal.Content>
            <CopyToClipboard text={url}
            onCopy={this.copyAndClose}>
              <Input size='mini' icon='linkify' value={url} />
            </CopyToClipboard>
            {this.state.copied ? <span style={{color: 'blue'}}> Link copied.</span> : null}
          </Modal.Content>
        </Modal>
      </>
    )
  }
}

export default ModalContainer
