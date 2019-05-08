import React from 'react';
import './App.css';
import Game from './Game';
// const consonants = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k']
const mockGame = ['b', 'c', 'd', 'f', 'g'];
const App: React.FC = () => {
  return (
    <div className='app'>
      <Game sounds={mockGame} />
    </div>
  );
}

export default App;
