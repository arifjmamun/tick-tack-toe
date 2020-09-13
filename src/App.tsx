import React from 'react';
import './App.css';

import Board from './components/Board';
import Result from './components/Result';
import ActionLogs from './components/ActionLogs';

function App() {
  return (
    <div className="app">
      <Result />
      <Board />
      <ActionLogs />
    </div>
  );
}

export default App;
