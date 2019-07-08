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

  renderTable = (itemArray) => {
    return(
      <table style={{padding: '5px 15px'}}>
        <tbody>
          <tr>
            <th></th>
            <th>Item</th>
            <th>Count</th>
          </tr>
          {itemArray.map((item, index) => {
            return(
              <tr key={item.index}>
              <td className="table-index">{item.index}</td>
              <td>{this.parseName(item.name)}</td>
              <td className="table-count">{item.count}</td>
              </tr>
            )}
          )}
        </tbody>
      </table>
    )
  }

  renderInputList = () => {
    const itemList = this.props.itemList
    const itemCount = []
    // create an array consisting of items with their count
    itemList.forEach(item => {
      let count = this.countInputs(item)
      if (count > 0) {
        item.count = count
        itemCount.push(item)
      }
    })

    itemCount.forEach((item, index) => {
      item.index = index + 1
    })

    const arrayLength = itemCount.length

    return(
      <>
        {this.renderTable(itemCount.slice(0,10))}
        {arrayLength > 10 ?
          this.renderTable(itemCount.slice(10,20))
          :
          null
        }
      </>
    )
  }

  render(){
    return(
      <>
        <Modal open={this.props.PDFVisible} size="small" onClose={this.props.hidePDF} closeIcon style={{backgroundColor: 'rgb(235, 235, 235)'}}>
        <Button style={{margin: '10px 55px'}} positive   onClick={this.exportPDF}><Icon name="download"/>Download PDF</Button>
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
                <div style={{display: 'flex'}}>
                    {this.renderInputList()}
                </div>
              </div>
            </div>
          </PDFExport>
        </Modal>
      </>
    )
  }
}

export default PDFSaver
