import React, {Component} from 'react';
import './App.css';
import 'semantic-ui-css/semantic.min.css'
import Nav from './component/Nav'
import PDFSaver from './component/PDFSaver'
import ItemSelector from './component/ItemSelector'
import Stage from './container/Stage'

class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      itemsOnStage: [],
      itemList: [],
      plotId: null,
      slug: this.props.match.params.slug,
      saved: false,
      timerActive: false,
      toolbarOpen: false,
      clickPosition: {x: 0, y: 0},
      PDFVisible: true
    }
  }

  componentDidMount(){
    // Populates Toolbar with available items
    this.getItemList()

    // Renders stage plot items if viewing saved plot
    if (this.state.slug) {
      this.getStagePlot()
      .then(this.updatePlotState)
    }
  }

  // closes or opens toolbar for user to select item
  openToolbar = () => {
    this.setState({toolbarOpen: true})
  }

  closeToolbar = () => {
    this.setState({toolbarOpen: false})
  }

  // updates the state to reflect the coordinates
  // the user has clicked in the stage div
  setClickPosition = (x, y) => {
    this.setState({clickPosition: {x: x, y: y}})
  }

  // shows/hides the PDF preview modal
  showPDF = () => {
    this.savePlot()
    this.setState({PDFVisible: true})
  }

  hidePDF = () => this.setState({PDFVisible: false})

  // returns list of possible items
  getItemList = () =>{
    fetch('http://localhost:3000/items/')
      .then(resp => resp.json())
      .then((items) => this.setState({
            itemList: items
          }))
  }

  // saves the position of all of the items on stage
  savePlot = () =>{
    const URL = `http://localhost:3000/plots/${this.state.plotId}`
    const options = {
      method: "PUT",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({items: this.state.itemsOnStage})
    }
    fetch(URL, options)
      .then(resp => resp.json())
      .then((plot) => {
        this.updatePlotState(plot)
        console.log('saved')
        this.setState({
          saved: true,
          timerActive: false
        })
      })
  }

  // this creates a timer that automatically saves the plot
  // ten seconds after the user has moved an item
  timeoutHandler = null

  autoSave = () => {
    if (!this.state.timerActive){
      this.setState({timerActive: true})
      this.timeoutHandler = setTimeout(() => this.savePlot(), 10000)
    }
  }

  // updates the position of moved items in the DOM
  updatePlotState = (plot) => {
    this.setState({
      itemsOnStage: plot.items,
      plotId: plot.id
    })
  }

  getStagePlot = () => {
    // retrieves stagePlot using url slug
    let URL = `http://localhost:3000/plots/${this.state.slug}`
    return fetch(URL).then(resp => resp.json()).then(this.setState({saved: true}))
  }

  addItemToStage = (item) => {
    // set intended position of item
    item.x = this.state.clickPosition.x
    item.y = this.state.clickPosition.y

    // handle new url
    let URL
    let options
    let newPlot = false
    if (this.state.plotId){
      URL = `http://localhost:3000/plots/${this.state.plotId}`
      options = {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({items: [...this.state.itemsOnStage, item]})
      }
    } else {
      newPlot = true
      URL = "http://localhost:3000/plots/"
      options = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({items: [item]})
      }
    }
    // Make fetch call
    fetch(URL, options )
    .then(resp => resp.json())
    .then(plot => {
      this.updatePlotState(plot)
      if (newPlot) this.props.history.push(plot.url)
      this.setState({saved: true})
      }
    )
  }

  deleteItem = (item) => {
    const URL = `http://localhost:3000/plots/${this.state.plotId}`
    const options = {
      method: "DELETE",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(item)
    }
    fetch(URL, options )
      .then(resp => resp.json())
      .then(this.updatePlotState)
      .then(this.setState({saved: true}))
  }

  updateItemPos = (updatedItem) => {
    this.setState({
      itemsOnStage: this.getNewItemPosition(updatedItem),
      saved: false
    })
  }

  getNewItemPosition = ({pos, id}) => {
    return this.state.itemsOnStage.map(item => {
      if (item.items_plots_id === id){
        return {...item, x: pos.x, y: pos.y}
      } else {
        return item
      }
    })
  }

  render(){
    const {plotId, slug, itemList, saved, toolbarOpen, itemsOnStage} = this.state
    return (
      <div>
        <Nav
          plotId={plotId}
          slug={slug}
          saved={saved}
          savePlot={this.savePlot}
          showPDF={this.showPDF}
        />
        <ItemSelector
          itemList={itemList}
          toolbarOpen={toolbarOpen}
          closeToolbar={this.closeToolbar}
          addItemToStage={this.addItemToStage}
        />
        <PDFSaver
          itemsOnStage={itemsOnStage}
          itemList={itemList}
          PDFVisible={this.state.PDFVisible}
          hidePDF={this.hidePDF}
        />
        <Stage
          itemsOnStage={itemsOnStage} updateItemPos={this.updateItemPos}
          autoSave={this.autoSave}
          setCurrentItem={this.setCurrentItem}
          openToolbar={this.openToolbar}
          setClickPosition={this.setClickPosition}
          itemList={itemList}
          deleteItem={this.deleteItem}
        />
      </div>
    );
  }
}

export default App;
