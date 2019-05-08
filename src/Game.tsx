import * as React from 'react';
import CardContainer from './CardContainer';
import config from './config';
import produce from 'immer';

export interface IGameProps {
    sounds: string[];
}

export interface IGameState {
    remainingSounds: string[];
    score: number;
}

export const AUDIO_KEYS = {
    CORRECT: '_correct',
    FLIP: '_flip'
};

const promiseTimeout = (time: number) => () => new Promise(resolve => setTimeout(resolve, time));

export default class Game extends React.Component<IGameProps, IGameState> {
    private audioMap: Map<string, HTMLAudioElement>;

    constructor(props: IGameProps) {
        super(props);

        this.audioMap = new Map(this.props.sounds.map(s => [s, new Audio(require(`./assets/sounds/${s}.mp3`))]));
        this.audioMap.set(AUDIO_KEYS.CORRECT, new Audio(require('./assets/correct.wav')));
        this.audioMap.set(AUDIO_KEYS.FLIP, new Audio(require('./assets/flip.wav')));

        this.state = {
            remainingSounds: props.sounds,
            score: 0,
        }
    }

    generateCards(maxCardCount: number): string[] {
        const cards: string[] = [];
        for (let i = 0; i < this.state.remainingSounds.length; i++) {
            if (i >= maxCardCount) {
                return cards.cShuffle();
            }
            const s = this.state.remainingSounds[i];
            console.assert(s.length === 1, 'Cannot handle multiple letter sounds');
            cards.push(s.toLowerCase());
            cards.push(s.toUpperCase());
        }

        return cards.cShuffle();
    }

    playAudio = (sound: string) => {
        const flipAudio = this.audioMap.get(AUDIO_KEYS.FLIP) as HTMLAudioElement;
        if (sound === AUDIO_KEYS.FLIP) {
            flipAudio.onended = null;
        }
        else {
            const audio = this.audioMap.get(sound);
            if (!audio) {
                console.error('Could not find audio for key: ' + sound);
            } else {
                flipAudio.onended = () => { audio.play().catch(r => console.error('Could not play audio: ' + r)) };
            }
        }
        flipAudio
            .play()
            .catch((r) => console.error('Could not play audio: ' + r));


    }

    cardsFinishedHandler = (cards: string[]) => {
        const nextState = produce(this.state, draftState => {
            for (const c of cards) {
                draftState.remainingSounds.cRemove(c);
            }
        });
        this.setState(nextState);
    }

    successHandler = (card: string) => {
        this.playAudio(AUDIO_KEYS.CORRECT)
        this.setState({ score: this.state.score + 1 });
    }

    public render() {
        return (
            <div className='game'>
                <CardContainer
                    audioPlayer={this.playAudio}
                    successHandler={this.successHandler}
                    outOfCardsHandler={this.cardsFinishedHandler}
                    cardValues={this.generateCards(config.MAX_SOUND_COUNT)} />

            </div>
        );
    }
}
