import React, {Component} from 'react'
import StaticItem from '../component/StaticItem'
import styled from 'styled-components'

const Container = styled.div`
  height: 360px;
  width: 600px;
  margin: auto;
  position: relative;
`

class StaticStage extends Component {
  render(){
    return(
      <Container id="staticstage">
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
