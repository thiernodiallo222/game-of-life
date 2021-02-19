import React from 'react';
import './App.css';
import Grid from './Grid';


class App extends React.Component {

    constructor() {
    super();
    this.speed = 300;
    this.rows = 30;
    this.cols = 50;
    this.running = false;
    this.flag = false;
    this.state = {
      generation: 0,
      fullGrid: Array(this.rows).fill().map(() => Array(this.cols).fill(false)),
    }
  }

  	selectCell = (row, col) => {
		let copy = clonedGrid(this.state.fullGrid);
		copy[row][col] = !copy[row][col];
		this.setState({
			fullGrid: copy
		});
	}

  	randomPattern = () => {
		let copy = clonedGrid(this.state.fullGrid);
		for (let i = 0; i < this.rows; i++) {
			for (let j = 0; j < this.cols; j++) {
				if (Math.floor(Math.random() * 4) === 1) {
					copy[i][j] = true;
				}
			}
		}
		this.setState({
			fullGrid: copy
		});
	}

  startButton = () => {
    // let count = 0;
    // let g = clonedGrid(this.state.fullGrid);
    // for (let i = 0; i < this.rows; i++) {
    //   for (let j = 0; j < this.cols; j++) {
    //     if (g[i][j]) count++;
    //   }
    // }
    // if (count > 0 || this.state.generation>0) {
      this.running = true;
      clearInterval(this.intervalId);
      this.intervalId = setInterval(this.play, this.speed);
    }
  // }
  
  stopButton = () => {
    clearInterval(this.intervalId);
    this.running = false;
    this.setState({
      generation:this.state.generation,
    })
	}


  clearAll = () => {
    this.stopButton();
    let grid = Array(this.rows).fill().map(() => Array(this.cols).fill(false));
    this.running = false;
		this.setState({
			fullGrid: grid,
			generation: 0
		});
	}

  Pattern2 = () => {
    if (this.flag === true) {
      let g = this.state.fullGrid;
      for (let i = 0; i < this.rows; i++){
        for (let j = 0; j < this.cols; j++){
          g[i][j] = false;
        }
      }
    this.flag = false;
     g[10][10]=g[11][10]=g[12][9]=g[12][11]=g[13][11] = true;
     this.setState({
      fullGrid: g,
      generation:0
    })
    }
  }
  
  Pattern1 = () => {
    this.flag = true;
    let g = this.state.fullGrid;
     for (let i = 0; i < this.rows; i++){
        for (let j = 0; j < this.cols; j++){
          g[i][j] = false;
        }
      }
    g[10][10]=g[10][11]=g[9][11] = g[10][12]= true;
    this.setState({
      fullGrid: g,
      generation:0
    })
  }

  toggleSize = () => {
    this.rows = this.rows ===30?40:30 ;
    this.cols = this.cols ===50? 60: 50;
    this.setState({
    fullGrid: Array(this.rows).fill().map(() => Array(this.cols).fill(false)),
    })
  }
  
play = () => {
		let g = this.state.fullGrid;
  let g2 = clonedGrid(this.state.fullGrid);


		for (let i = 0; i < this.rows; i++) {
		  for (let j = 0; j < this.cols; j++) {
		    let count = 0;
		    if (i > 0) if (g[i - 1][j]) count++;
		    if (i > 0 && j > 0) if (g[i - 1][j - 1]) count++;
		    if (i > 0 && j < this.cols - 1) if (g[i - 1][j + 1]) count++;
		    if (j < this.cols - 1) if (g[i][j + 1]) count++;
		    if (j > 0) if (g[i][j - 1]) count++;
		    if (i < this.rows - 1) if (g[i + 1][j]) count++;
		    if (i < this.rows - 1 && j > 0) if (g[i + 1][j - 1]) count++;
		    if (i < this.rows - 1 && j < this.cols - 1) if (g[i + 1][j + 1]) count++;
		    if (g[i][j] && (count < 2 || count > 3)) g2[i][j] = false;
        if (!g[i][j] && count === 3) g2[i][j] = true;
		  }
    }
  
    this.setState({
      fullGrid: g2,
      generation:this.state.generation + 1,
    });
  }

  componentDidMount() {
      this.randomPattern();
      this.startButton();
  }
  render() {
    return (
      <div>
        <h2 className="game-title">Game of Life</h2>

        <div className="buttons-wrapper">

          <button className='all-buttons' onClick={this.running ? this.stopButton : this.startButton}>{this.running? "STOP":"START"}</button>
          <button className='all-buttons' onClick={this.toggleSize}>{this.rows===30? "Larger View":"Smaller View"}</button>
          <button className='all-buttons' onClick={this.flag? this.Pattern2: this.Pattern1 }>{this.flag? "Custom Pattern 2":"Custom Pattern 1"}</button>
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
        <div className="section">
          <h3> Rules of the game of life </h3>
          <p>1. Any live cell that has less than two live neighbors, dies</p>
          <p>2. Any live cell that has more than tree live neighbors, dies</p>
          <p>3. Any live cell that has two or tree live neighbors, survives to the next generation</p>
          <p>4. Any dead cell has tree live neighbors, becomes alive in the next generation</p>

        </div>
        </div>
    );
  }
}
function clonedGrid(grid) {
  return JSON.parse(JSON.stringify(grid));
}

export default App

