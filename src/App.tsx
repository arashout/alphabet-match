import React from 'react';
import './App.css';
import CardContainer from './CardContainer';

// const consonants = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k']
const mockGame = ['b', 'B', 'c', 'C', 'd', 'D', 'f', 'F'];
const App: React.FC = () => {
  return (
    <div className='app'>
      <CardContainer cards={mockGame}/>
    </div>
  );
}

export default App;
