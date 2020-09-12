import React from 'react';
import './App.css';

import Board from './components/Board';
import Result from './components/Result';

function App() {
  return (
    <div className="app">
      <Result />
      <Board />
    </div>
  );
}

export default App;
