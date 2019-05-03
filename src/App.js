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
      currentItem: {}
    }
  }

  getItemList = () =>{
    return [
      {id: 1, name: 'mic stand', image: 'micstand.png', x: 200, y: 0},
      {id: 2, name: 'five-piece drumset', image: 'drumset-5.jpg', x: 200, y: 200},
      {id: 3, name: 'stage monitor', image: 'monitor.png', x: 200, y: 0}
    ]
  }

  componentDidMount(){
    console.log('mounted')
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

  newItemPosition = ({pos, uuid}) => {
    console.log(pos, uuid)
    return this.state.itemsOnStage.map(item => {
      if (item.uuid === uuid){
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
      <Nav/>
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
