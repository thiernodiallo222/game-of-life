import React, { Component } from 'react'
import "./App.css";
class Cell extends Component {
  selectCell = () => {
    this.props.selectCell(this.props.row, this.props.col)
  }
  render() {
    return (
      <div
        className={this.props.cellClass}
        cellId={this.props.cellId}
        onClick={this.selectCell}
      />
    );
  }
}

export default Cell
