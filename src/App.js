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

  seed = () => {
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
    clearInterval(this.IntervalId);
    this.IntervalId = setInterval(this.play, this.speed);
  }
  play = () => {
    let g = this.state.fullGrid;
    let g2 = this.clonedArray(this.state.fullGrid);

    
  }
  componentDidMount() {
    this.seed()
    this.startButton();
  }
  constructor() {
    super();
    this.speed = 100;
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

          <button className='all-buttons'>START / STOP</button>
          <button className='all-buttons'>GRID SIZING</button>
          <button className='all-buttons'>CUSTOM PATTERN</button>
           <button className='all-buttons'>RANDOM PATTERN</button>
          <button className='all-buttons'>CLEAR ALL</button>
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

