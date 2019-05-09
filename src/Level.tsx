import * as React from 'react';
import CardContainer from './CardContainer';
import config from './config';
import produce from 'immer';

export interface ILevelProps {
    sounds: string[];
    onCompletedHandler: () => void;
    onMatchHandler: (cardValue: string) => void;
}

export interface ILevelState {
    remainingSounds: string[];
}



export default class Level extends React.Component<ILevelProps, ILevelState> {
    constructor(props: ILevelProps) {
        super(props);

        this.state = {
            remainingSounds: props.sounds,
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

    cardsFinishedHandler = (cards: string[]) => {
        const nextState = produce(this.state, draftState => {
            for (const c of cards) {
                draftState.remainingSounds.cRemove(c);
            }
        });
        if (nextState.remainingSounds.length === 0) {
            this.props.onCompletedHandler();
        } else {
            this.setState(nextState);
        }

    }

    componentWillReceiveProps(nextProps: ILevelProps){
        if(nextProps.sounds !== this.props.sounds){
            this.setState({remainingSounds: nextProps.sounds});
        }
    }

    public render() {
        return (
            <div className='level'>
                <CardContainer
                    successHandler={this.props.onMatchHandler}
                    outOfCardsHandler={this.cardsFinishedHandler}
                    cardValues={this.generateCards(config.MAX_SOUND_COUNT)} />
            </div>
        );
    }
}
