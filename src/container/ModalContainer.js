import React, {Component} from 'react'
import {Button, Modal, Icon, Input} from 'semantic-ui-react'
import {CopyToClipboard} from 'react-copy-to-clipboard';
// import 'semantic-ui-css/semantic.min.css'

class ModalContainer extends Component {
  state = {
    open: false,
    url: 'http://localhost:3001/' + this.props.slug,
    copied: false,
  }

  show = size => () => this.setState({ size, open: true })
  close = () => this.setState({ open: false })

  render(){
    const { open, size, url } = this.state
    return (
      <div>
        <Button primary='true' size='small'  onClick={this.show('mini')}>
          <Icon name='URL' />Share</Button>
        <Modal size={size} open={open} onClose={this.close}>
          <Modal.Header>Share your plot</Modal.Header>
          <Modal.Content>
            <CopyToClipboard text={url}
            onCopy={() => this.setState({copied: true})}>
              <Input size='small' icon='linkify' value={url} />
            </CopyToClipboard>
            {this.state.copied ? <span style={{color: 'blue'}}> Copied to clipboard.</span> : null}
          </Modal.Content>
        </Modal>
      </div>
    )
  }
}

export default ModalContainer
