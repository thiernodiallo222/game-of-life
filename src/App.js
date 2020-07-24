import React from 'react';
import './App.css';
import Grid from './Grid';


export class App extends React.Component {
  constructor(){
    super();
    this.state = {
      generation:0
    }
  }
  render() {
    return (
      <div className="main-component">
      <div className='top-buttons-wrapper'>
        <button className='all-buttons'>START / STOP</button>
        <button className='all-buttons'>GRID SIZING</button>
        <button className='all-buttons'>CUSTOM PATTERN</button>
      </div>

        <div className='grid-wrapper'>
          <Grid className='grid'/>
        </div>
      
      <div className='bottom-buttons-wrapper'>
         <div className='all-buttons' generation-div><h3 >GENERATION: {this.state.generation}</h3></div>
        <button className='all-buttons'>RANDOM PATTERN</button>
        <button className='all-buttons'>CLEAR ALL</button>
      </div>
      
    </div>
  )
  }
}

export default App
