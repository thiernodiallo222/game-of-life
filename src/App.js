import React from 'react';
import './App.css';

function App() {
  return (
    <div className="main-component">

      
      <div className='top-buttons-wrapper'>
        <button className='all-buttons'>ON/OFF</button>
        <button className='all-buttons'>Grid Size</button>
        <button className='all-buttons'>Custom pattern</button>
      </div>

      <div className='grid-wrapper'>
        </div>
      
      <div className='bottom-buttons-wrapper'>
         <div className='all-buttons' generation-div><h3>generation: { 0}</h3></div>
        <button className='all-buttons'>Random pattern</button>
        <button className='all-buttons'>Clear</button>
      </div>
      
    </div>
  )

}

export default App;
