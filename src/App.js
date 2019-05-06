import React, {Component} from 'react';
import './App.css';
import Nav from './component/Nav'
import Toolbar from './container/Toolbar'
import Stage from './container/Stage'
import UUID from 'uuid/v4'

class App extends Component {

  // Creates a new plot if no url has been passed
  static createNewPlot = () =>{
    return 5
  }

  static defaultProps = {
    // Set this to a fetch call that creates a new
    // plot instance in the database
    plotId: this.createNewPlot(),
  }

  constructor(props){
    super(props)
    this.state = {
      itemsOnStage: [],
      itemList: this.getItemList(),
      currentItem: {},
      plotId: this.props.plotId
    }
  }

  //
  // Should be replaced with a method that pulls this from the backend
  getItemList = () =>{
    return [
      {id: 1, name: 'mic stand', image: 'micstand.png'},
      {id: 2, name: 'five-piece drumset', image: 'drumset-5.jpg'},
      {id: 3, name: 'stage monitor', image: 'monitor.png'}
    ]
  }

  savePlot = () =>{
    const URL = `http://localhost:3000/plots/${this.state.plotId}`
    const options = {
      method: "PUT",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({items: this.state.itemsOnStage})
    }
    fetch(URL, options )
      .then(resp => resp.json())
      .then(this.updatePlotState)
  }

  componentDidMount(){
    this.getItemsOnStage()
    .then(this.updatePlotState)
  }

  updatePlotState = (plot) => {
    this.setState({
      itemsOnStage: plot.items,
      plotId: plot.id
    })
  }

  getItemsOnStage = () => {
    let URL = `http://localhost:3000/plots/${this.state.plotId}`
    return fetch(URL).then(resp => resp.json())
  }

  addItemToStage = (item) => {
      const URL = `http://localhost:3000/plots/${this.state.plotId}`
      const options = {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({items: [item]})
      }

      fetch(URL, options )
        .then(resp => resp.json())
        .then(this.updatePlotState)
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
  }


  updateItemPos = (updatedItem) => {
    this.setState({
      itemsOnStage: this.newItemPosition(updatedItem)
    })
  }

  newItemPosition = ({pos, id}) => {
    return this.state.itemsOnStage.map(item => {
      if (item.items_plots_id === id){
        return {...item, x: pos.x, y: pos.y}
      } else {
        return item
      }
    })
  }

  setCurrentItem = (item) => {
    this.setState({
      currentItem: item
    })
  }

  render(){
    return (
      <>
      <Nav savePlot={this.savePlot}/>
      <Toolbar
        itemList={this.state.itemList} addItemToStage={this.addItemToStage}
      />
      <Stage itemsOnStage={this.state.itemsOnStage} updateItemPos={this.updateItemPos}
      setCurrentItem={this.setCurrentItem}
      deleteItem={this.deleteItem}/>
      </>
    );
  }
}

export default App;
