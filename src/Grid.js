import React, { Component } from 'react'

export class Grid extends Component {
  constructor() {
    super()
    this.state = {
      stuff: 23, 
      anotherstuff: 87

    }
  }
  render() {
    return (
      <div>
        <h3>I am the grid</h3>
        
      </div>
    )
  }
}

export default Grid
