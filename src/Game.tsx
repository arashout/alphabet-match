import * as React from 'react';
import Level from './Level';
import {consonantsReduced, vowels, allSounds} from './shared';

export interface IGameProps {
}

export interface IGameState {
    score: number;
    level: number;
}

export interface IGameProps {
}

export default function Game(props: IGameProps) {
    const [score, setScore] = React.useState(0);
    const [level, setLevel] = React.useState(1);
    const levelDict: Dictionary<string[]> = {
        1: consonantsReduced,
        2: consonantsReduced.cShuffle(),
        3: vowels,
        4: allSounds.cShuffle()
    }

    return (<div className='game'>
        <Level
            sounds={levelDict[level]}
            onMatchHandler={() => setScore(score + 1 * level)}
            onCompletedHandler={() => setLevel(level + 1)}
        />
        <div className='game-bar'>Level: {level} Score: {score}</div>
    </div>)
}

