import React, {Component} from 'react';
import './App.css';
import 'semantic-ui-css/semantic.min.css'
import bgImage from './icons/band-on-stage.jpg'
import Nav from './component/Nav'
// import Toolbar from './container/Toolbar'
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
      toolbarOpen: true
    }
  }

  // closes or opens toolbar for user to select item
  openToolbar = () => {
    this.setState({toolbarOpen: true})
  }

  closeToolbar = () => {
    this.setState({toolbarOpen: false})
  }

  getItemList = () =>{
    fetch('http://localhost:3000/items/')
      .then(resp => resp.json())
      .then((items) => this.setState({
            itemList: items
          }))
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
      .then((plot) => {
        this.updatePlotState(plot)
        this.setState({
          saved: true
        })
      })
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

  updatePlotState = (plot) => {
    this.setState({
      itemsOnStage: plot.items,
      plotId: plot.id
    })
  }

  getStagePlot = () => {
    // retrieves stagePlot using url slug
    let URL = `http://localhost:3000/plots/${this.state.slug}`
    return fetch(URL).then(resp => resp.json())
  }

  addItemToStage = (item) => {
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
  }

  updateItemPos = (updatedItem) => {
    this.setState({
      itemsOnStage: this.newItemPosition(updatedItem),
      saved: false
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

  render(){
    const {plotId, slug, itemList, saved, toolbarOpen} = this.state
    return (
      <div>
        <Nav plotId={plotId} slug={slug} saved={saved} savePlot={this.savePlot}/>
        <ItemSelector
          itemList={itemList}
          toolbarOpen={toolbarOpen}
          closeToolbar={this.closeToolbar}
          />
        <Stage
          itemsOnStage={this.state.itemsOnStage} updateItemPos={this.updateItemPos}
          setCurrentItem={this.setCurrentItem}
          addItemToStage={this.addItemToStage}
          openToolbar={this.openToolbar}
          itemList={itemList}
          deleteItem={this.deleteItem}
        />
      </div>
    );
  }
}

export default App;
