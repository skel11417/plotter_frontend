import React, {Component} from 'react';
import './App.css';
import Nav from './component/Nav'
import Toolbar from './container/Toolbar'
import Stage from './container/Stage'
import UUID from 'uuid/v4'

class App extends Component {

  constructor(){
    super()
    this.state = {
      itemsOnStage: [],
      itemList: this.getItemList(),
      currentItem: {},
      plotId: null
    }
  }

  getItemList = () =>{
    return [
      {id: 1, name: 'mic stand', image: 'micstand.png'},
      {id: 2, name: 'five-piece drumset', image: 'drumset-5.jpg'},
      {id: 3, name: 'stage monitor', image: 'monitor.png'}
    ]
  }

  savePlot = () =>{
    const URL = `http://localhost:3000/plots/${this.state.plotId}`
    console.log("saving the plot", URL)

    const options = {
      method: "PUT",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({items: this.state.itemsOnStage})
    }

    fetch(URL, options )
      .then(resp => resp.json())
      .then(console.log)
  }

  componentDidMount(){
    this.getItemsOnStage()
    .then(plot => {
      this.setState({
        itemsOnStage: plot.items,
        plotId: plot.id
      })
    })
  }

  getItemsOnStage = () => {
    let URL = 'http://localhost:3000/plots/4'
    return fetch(URL).then(resp => resp.json())
  }

  addItemToStage = (item) => {
    item = {...item, uuid: UUID()}
    this.setState({
      itemsOnStage: [...this.state.itemsOnStage, item]
    })
  }

  updateItemPos = (updatedItem) => {
    this.setState({
      itemsOnStage: this.newItemPosition(updatedItem)
    })
  }

  newItemPosition = ({pos, id}) => {
    return this.state.itemsOnStage.map(item => {
      if (item.id === id){
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
      setCurrentItem={this.setCurrentItem}/>
      </>
    );
  }
}

export default App;
