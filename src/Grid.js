import React, { Component } from 'react'
import Cell from './Cell'
import "./App.css";
class Grid extends Component {

  render() {
    const width = this.props.cols*17;
    const rowsArray = [];
    let cellClass = "";
    for (let i = 0; i < this.props.rows; i++){
      for (let j = 0; j < this.props.cols; j++){
        let cellId = i + "_" + j;
        cellClass = this.props.fullGrid[i][j] ? "cell on" : "cell off";
        rowsArray.push(
          <Cell
            cellClass={cellClass}
            key={cellId}
            cellId={cellId}
            row={i}
            col={j}
            selectCell={this.props.selectCell}
          />
        );
       }
    }
    return (
      <div className='grid' style={{width: width}}>
       {rowsArray}
      </div>
    )
  }
}

export default Grid
