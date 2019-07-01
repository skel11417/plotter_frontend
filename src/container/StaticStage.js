import React, {Component} from 'react'
import StaticItem from '../component/StaticItem'
import styled from 'styled-components'

const Container = styled.div`
  height: 300px;
  width: 600px;
`

class StaticStage extends Component {
  render(){
    return(
      <Container>
       {this.props.itemsOnStage.map(item =>
          <StaticItem
          item={item}
          key={item.items_plots_id}
          position={{x: item.x, y: item.y}}
          />
          )
        }
      </Container>
    )
  }
}

export default StaticStage
