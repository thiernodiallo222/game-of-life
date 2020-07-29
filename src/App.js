import React from 'react';
import './App.css';
import Grid from './Grid';


class App extends React.Component {

  selectCell = (row, col) => {
    let copy = clonedGrid(this.state.fullGrid);
    copy[row][col] = !copy[row][col];
    this.setState({
      fullGrid: copy,
    })
  }

  randomPattern = () => {
    let copy = clonedGrid(this.state.fullGrid);
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        if (Math.floor(Math.random() * 4)=== 1) {
          copy[i][j] = true;
        }
      }
    }
     this.setState({
      fullGrid: copy,
    })
  }
  startButton = () => {
    let count = 0;
    let g = this.state.fullGrid;
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        if (g[i][j]) count++;
      }
    }

    if (count >0) {
    clearInterval(this.IntervalId);
    this.IntervalId = setInterval(this.play, this.speed);
    } 
  }
  stopButton = () => {
    clearInterval(this.IntervalId);
    this.setState({
      generation: 0
    })
  }
  clearAll = () => {
    let g = this.state.fullGrid;
    let g2 = clonedGrid(this.state.fullGrid);
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        if (g[i][j] && this.state.generation===0) g2[i][j] = false;
      }
    }
    this.setState({
      fullGrid: g2,
    });
  }
  
  play = () => {
    let g = this.state.fullGrid;
    let counter=0
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++){
        if (g[i][j]){
          counter++;
        }
      }
    }
    if (counter > 0) {
       let g2 = clonedGrid(this.state.fullGrid);
    for (let i = 0; i < this.rows; i++){
      for (let j = 0; j < this.cols; j++){
        let count = 0;
        if (i > 0) if (g[i - 1][j]) count++;
        if (i > 0 && j > 0) if (g[i - 1][j - 1]) count++;
        if (i > 0 && j < this.cols - 1) if (g[i - 1][j + 1]) count++;
        if (j < this.cols - 1) if (g[i][j + 1]) count++;
        if (j > 0) if (g[i][j - 1]) count++;
        if (i < this.rows - 1) if (g[i + 1][j]) count++;
        if (i < this.rows - 1 && j > 0) if (g[i + 1][j - 1]) count++;
        if (i < this.rows - 1 && this.cols - 1) if (g[i + 1][j + 1]) count++;
        if (g[i][j] && (count < 2 || count > 3)) g2[i][j] = false;
        if (!g[i][j] && count === 3) g2[i][j] = true;
      }
    }
    this.setState({
      fullGrid: g2,
      generation: this.state.generation + 1,
    });
    }
  }
  // componentDidMount() {
  //   this.seed()
  // }
  constructor() {
    super();
    this.speed = 500;
    this.rows = 30;
    this.cols = 50;

    this.state = {
      generation: 0,
      fullGrid: Array(this.rows).fill().map(() => Array(this.cols).fill(false)),
    }
  }
  
  render() {
    return (
      <div>
        <h2 className="game-title">Game of Life</h2>

        <div className="buttons-wrapper">

          <button className='all-buttons' onClick={this.state.generation===0? this.startButton : this.stopButton}>{this.state.generation ===0 ? "START": "STOP"}</button>
          <button className='all-buttons' onClick={this.biggerSize}>RESIZE GRID</button>
          <button className='all-buttons'>CUSTOM PATTERN</button>
           <button className='all-buttons' onClick={this.randomPattern}>RANDOM PATTERN</button>
          <button className='all-buttons' onClick={this.clearAll}>CLEAR ALL</button>
        </div>

     
          <Grid className="grid"
            fullGrid={this.state.fullGrid}
            rows={this.rows}
            cols={this.cols}
            selectCell={this.selectCell}
          />
       
        <h2 className="generation">Generation: {this.state.generation}</h2>
        </div>
    );
  }
}
function clonedGrid(grid) {
  return JSON.parse(JSON.stringify(grid));
}

export default App

