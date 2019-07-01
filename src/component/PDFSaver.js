import React, {Component} from 'react'
import { PDFExport, savePDF } from '@progress/kendo-react-pdf'
import {Modal} from 'semantic-ui-react'
import inputMap from '../inputMap.js'
import styled from 'styled-components'

const input = styled.div``

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
    const itemsOnStage = this.props.itemsOnStage
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
        <tr>
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
        <Modal open={this.props.PDFVisible} onClose={this.props.hidePDF}>
        <button onClick={this.exportPDF}>DownloadPDF</button>
          <PDFExport paperSize={'Letter'}
          fileName="_____.pdf"
          title=""
          subject=""
          keywords=""
          ref={(r) => this.stagePlot = r}>
          <div style={{
            height: 792,
            width: 612,
            padding: 'none',
            backgroundColor: 'white',
            boxShadow: '5px 5px 5px black',
            margin: 'auto',
            overflowX: 'hidden',
            overflowY: 'hidden'}}>
            <h1>Stage Plot</h1>
            <div>The stage will go here</div>
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
