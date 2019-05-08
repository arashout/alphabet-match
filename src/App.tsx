import React from 'react';
import './App.css';
import Game from './Game';
const consonants = [
  "b",
  "c",
  "d",
  "f",
  "g",
  "h",
  "j",
  "k",
  "l",
  "m",
  "n",
  "p",
  // "q",
  "r",
  "s",
  "t",
  "v",
  "w",
  "x",
  "z"
];
const App: React.FC = () => {
  return (
    <div className='app'>
      <Game sounds={consonants} />
    </div>
  );
}

export default App;
