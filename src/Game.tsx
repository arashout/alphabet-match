import * as React from 'react';
import Level from './Level';
import {consonantsReduced, vowels, allSounds} from './shared';
import audioPlayer, { AUDIO_KEYS } from './AudioPlayer';
import StackedCards from './StackedCards';

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

    return (<div className='game'>
        <Level
            sounds={levelDict[level]}
            onMatchHandler={(cardValue: string) => {
                audioPlayer.play(AUDIO_KEYS.CORRECT);
                return setMatched(matched.concat(...cardValue));
            }}
            onCompletedHandler={() => setLevel(level + 1)}
        />
        <StackedCards cardValues={stackedCards} />
    </div>)
}

