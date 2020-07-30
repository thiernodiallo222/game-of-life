import React from 'react';
import './App.css';
import Grid from './Grid';


class App extends React.Component {

  selectCell = (row, col) => {
    if (this.running === false) {
    let copy = clonedGrid(this.state.fullGrid);
    copy[row][col] = !copy[row][col];
    this.setState({
      fullGrid: copy,
      // generation:0,
    })
    }
  }

randomPattern = () => {
    if (this.running === false) {
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
   
  }
  startButton = () => {
    let count = 0;
    let g = this.state.fullGrid;
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        if (g[i][j]) count++;
      }
    }
    if (count > 0) {
    this.running = true;
    clearInterval(this.IntervalId);
    this.IntervalId = setInterval(this.play, this.speed);
    } 
  }
  stopButton = () => {
    this.running = false;
    clearInterval(this.IntervalId);
    this.setState({
    })
  }
  clearAll = () => {
    if (this.running === false) {
     let g2 = clonedGrid(this.state.fullGrid);
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
      
        g2[i][j] = false;
      }
    }
    
      this.setState({
      fullGrid: g2,
      generation: 0,
    });
  }
  }
  anotherPattern = () => {
    if (this.flag === true) {
      let g = this.state.fullGrid;
      for (let i = 0; i < this.rows; i++){
        for (let j = 0; j < this.cols; j++){
          g[i][j] = false;
        }
      }
    this.flag = false;
    g[6][4]=g[6][5]=g[6][6]=g[6][8]=g[6][9]=g[6][10]=g[6][12]=g[6][13]=g[6][14]=g[6][16]=g[6][17]=g[6][18]=g[6][20]=g[6][21]=g[6][22]= g[6][24]=g[6][25]=g[6][26]=g[6][28]=g[6][29]=g[6][30]=g[6][31]=true;
     this.setState({
      fullGrid: g,
      generation:0
    })
    }
  }
  
  customPattern = () => {
    this.flag = true;
    let g = this.state.fullGrid;
     for (let i = 0; i < this.rows; i++){
        for (let j = 0; j < this.cols; j++){
          g[i][j] = false;
        }
      }
    g[7][7]=g[7][8]=g[9][10]=g[18][10]=g[19][10]=g[20][10]=g[14][8] = g[15][8] = g[16][8] = g[14][12] = g[15][12] = g[16][12] = true;
    this.setState({
      fullGrid: g,
      generation:0
    })
  }

  toggleSize = () => {
    if (this.running===false) {
    this.rows = this.rows ===30?48:30 ;
    this.cols = this.cols ===30? 60: 30;
    this.setState({
    fullGrid: Array(this.rows).fill().map(() => Array(this.cols).fill(false)),
    })
    }
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
        if ((i > 0 && i < this.rows - 1) && (j > 0 && j < this.cols - 1)) {
          if (g[i - 1][j]===true) count++;
         if (g[i - 1][j - 1]===true) count++;
         if (g[i][j - 1]===true) count++;
         if (g[i + 1][j - 1]===true) count++;
         if (g[i + 1][j]===true) count++;
         if (g[i + 1][j + 1]===true) count++;
         if (g[i][j + 1]===true) count++;
         if (g[i - 1][j+1]===true) count++;
        }
        if (g[i][j]===true && (count < 2 || count > 3)) g2[i][j] = false;
        if (g[i][j] === false && count === 3) g2[i][j] = true;
        if (g[i][j] === true && (count ===2|| count===3)) g2[i][j] = true;
      }
    }
    this.setState({
      fullGrid: g2,
      generation: g===g2? this.state.generation: this.state.generation + 1,
      running:true,
    });
    }
  }

  constructor() {
    super();
    this.speed = 500;
    this.rows = 30;
    this.cols = 30;
    this.running = false;
    this.flag = false;
    this.state = {
      generation: 0,
      fullGrid: Array(this.rows).fill().map(() => Array(this.cols).fill(false)),
    }
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

          <button className='all-buttons' onClick={this.running ? this.stopButton : this.startButton}>{this.running? "STOP": "START"}</button>
          <button className='all-buttons' onClick={this.toggleSize}>{this.rows===30? "Larger View":"Smaller View"}</button>
          <button className='all-buttons' onClick={this.flag? this.anotherPattern: this.customPattern }>{this.flag? "Another Pattern":"Custom Pattern"}</button>
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

