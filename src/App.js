
import React from 'react';
import {Nav, Bio, Gallery } from './components'

import "./App.css"



const App = () => {

  return (
  <>
   <Nav/>
    <div className='container'>
       <Bio/>
       <Gallery/>
    </div>
  </>
  );
}

export default App;

