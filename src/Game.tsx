import * as React from 'react';
import Level from './Level';
import {consonantsReduced, vowels, allSounds} from './shared';
import audioPlayer, { AUDIO_KEYS } from './AudioPlayer';
import StackedCards from './StackedCards';
import goldStarImg from './assets/images/gold_star.png';
import './Game.css';

export interface IGameProps {
}


export default function Game(props: IGameProps) {
    const [level, setLevel] = React.useState(1);
    const [matched, setMatched] = React.useState<string[]>([]);
    const levelDict: Dictionary<string[]> = {
        1: consonantsReduced,
        2: consonantsReduced.cShuffle(),
        3: vowels,
        4: allSounds.cShuffle()
    }
    const stackedCards = matched.map( (s) => `${s.toUpperCase()}${s.toLowerCase()}`);
    let sounds = levelDict[level];
    if(!sounds){
        sounds = allSounds;
    }

    // TODO: Could move to seperate component...
    const stars = []
    for(let i = 1; i<level; i++){
        stars.push(<img className='star' key={i} src={goldStarImg} alt='gold star'/>);
    }

    return (<div className='game'>
        <Level
            sounds={sounds}
            onMatchHandler={(cardValue: string) => {
                audioPlayer.play(AUDIO_KEYS.CORRECT);
                return setMatched(matched.concat(...cardValue));
            }}
            onCompletedHandler={() => setLevel(level + 1)}
        />
        <div className='status-bar d-flex justify-content-center'>
            <div className='stars d-flex flex-wrap justify-content-center align-items-center mr-5'>
                {stars}
            </div>
            <StackedCards cardValues={stackedCards} />
        </div>
        
    </div>)
}

