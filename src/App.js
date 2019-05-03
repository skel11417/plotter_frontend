import React, {Component} from 'react';
import './App.css';
import Nav from './component/Nav'
import Toolbar from './container/Toolbar'
import Stage from './container/Stage'

class App extends Component {

  constructor(){
    super()
    this.state = {
      itemsOnStage: [],
      itemList: this.getItemList()
    }
  }

  getItemList = () =>{
    return [
      {id: 1, name: 'mic stand', image: 'micstand.png' },
      {id: 2, name: 'five-piece drumset', image: 'drumset-5.jpg'},
      {id: 3, name: 'stage monitor', image: 'monitor.png'}
    ]
  }

  componentDidMount(){
    console.log('mounted')
  }

  addItemToStage = (item) => {
    console.log(item)
    this.setState({
      itemsOnStage: [...this.state.itemsOnStage, item]
    })
  }

  render(){
    return (
      <>
      <Nav/>
      <Toolbar
        itemList={this.state.itemList} addItemToStage={this.addItemToStage}
      />
      <Stage itemsOnStage={this.state.itemsOnStage}/>
      </>
    );
  }
}

export default App;
