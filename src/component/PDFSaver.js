import React, {Component} from 'react'
import { PDFExport } from '@progress/kendo-react-pdf'
import {Modal, Button, Icon} from 'semantic-ui-react'
import StaticStage from '../container/StaticStage'

class PDFSaver extends Component {

  exportPDF = () => {
    this.stagePlot.save()
  }

  parseName = (itemName) => {
    // return itemName
    return itemName.replace(/-/g, " ").replace(/\w\S*/g, text =>  text.charAt(0).toUpperCase() + text.substr(1)).replace("Di", "DI")
  }

  countInputs = (item) => {
    let count = 0
    this.props.itemsOnStage.forEach(itemOnStage => {
      if (itemOnStage.name === item.name){
        count++
      }
    })
    return count
  }

  renderInputList = () => {
    const itemList = this.props.itemList
    // create an array consisting of items with their count
    const itemCount = []
    itemList.forEach(item => {
      let count = this.countInputs(item)
      if (count > 0) {
        item.count = count
        itemCount.push(item)
      }
    })

    return itemCount.map((item, index) => {
      return(
        <tr key={index}>
          <td>{index+1}</td>
          <td>{this.parseName(item.name)}</td>
          <td>{item.count}</td>
        </tr>
      )
    })
  }

  render(){
    return(
      <>
        <Modal open={this.props.PDFVisible} size="small" onClose={this.props.hidePDF} closeIcon style={{backgroundColor: 'rgb(235, 235, 235)'}}>
        <Button style={{margin: '10px 55px'}} color="orange"   onClick={this.exportPDF}><Icon name="download"/>Download PDF</Button>
          <PDFExport paperSize={'Letter'}
          fileName="Stage Plot.pdf"
          title=""
          subject=""
          keywords=""
          ref={(r) => this.stagePlot = r}>
            <div id="pdf-content">
              <h1 style={{fontSize: '4em'}}>Stage Plot</h1>
              <StaticStage itemsOnStage={this.props.itemsOnStage}/>
              <div>
                <h3>Input List</h3>
                <table>
                  <tbody>
                    <tr>
                      <th></th>
                      <th>Input</th>
                      <th>Count</th>
                    </tr>
                    {this.renderInputList()}
                  </tbody>
                </table>
              </div>
            </div>
          </PDFExport>
        </Modal>
      </>
    )
  }
}

export default PDFSaver
