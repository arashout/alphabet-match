import * as React from 'react';
import './CardContainer.css';
import FlipCard, { Card } from './FlipCard';
import produce from 'immer';
import config from './config';
import { AUDIO_KEYS } from './Game';

export interface ICardContainerProps {
    cardValues: string[],
    outOfCardsHandler: (cardsUsed: string[]) => void;
    successHandler: (card: string) => void;
    audioPlayer: (sound: string) => void;
}

export interface ICardContainerState {
    cards: Card[];

}



function cardsFromValues(values: string[]): Card[] {
    return values.map((c) => { return { value: c, state: '' } });
}

export default class CardContainer extends React.Component<ICardContainerProps, ICardContainerState> {
    constructor(props: ICardContainerProps) {
        super(props);

        this.state = { cards: cardsFromValues(this.props.cardValues) };
    }
    /**
     * Toggles the flipped state of a card but leaves invisible cards
     * @param card 
     */
    toggleFlip(card: Card): Card {
        if (card.state === 'invisible') {
            return card;
        } else if (card.state === '') {
            this.props.audioPlayer(card.value.toLowerCase());
            return { value: card.value, state: 'flipped' };
        }
        else {
            this.props.audioPlayer(AUDIO_KEYS.FLIP);
            return { value: card.value, state: '' };
        }
    }
    getNextStateForFlip = (cardValue: string): ICardContainerState => {
        const i = this.state.cards.map((c) => c.value).indexOf(cardValue);
        console.assert(i !== -1, 'Could not find element');

        const card = this.state.cards[i];
        // NOTE: The order of these matters
        const nextState = produce(this.state, draftState => {
            draftState.cards[i] = this.toggleFlip(card);
        });

        return nextState;
    }

    clickHandler = (clickedCardValue: string) => {
        const flippedCards = this.state.cards.filter(c => c.state === 'flipped');
        // Return early if we are in the process of flipped cards
        if (flippedCards.length > 1) {
            return;
        }
        console.assert(flippedCards.length < 2, 'Too many flipped cards!');

        if (flippedCards.length === 1) {
            // 1. Trying to unflip flipped card
            const flippedCardValue = flippedCards[0].value;
            if (flippedCardValue === clickedCardValue) {
                this.setState(this.getNextStateForFlip(flippedCardValue));
            }
            // 2. Flipped a matching card, briefly show match then remove
            else if (flippedCardValue.toLowerCase() === clickedCardValue.toLowerCase()) {
                setTimeout(() => {
                    const nextState = produce(this.state, draftState => {
                        draftState.cards = this.state.cards.map((c): Card => {
                            if (c.state === 'flipped') {
                                return { value: c.value, state: 'invisible' }
                            } else {
                                return c;
                            }
                        });
                    });

                    this.props.successHandler(clickedCardValue);
                    this.setState(nextState);
                }, config.DELAY)
                this.setState(this.getNextStateForFlip(clickedCardValue));
            }
            // 3. Flipped non-matching card, briefly show then unflip both
            else {
                setTimeout(() => {
                    const nextState = produce(this.state, draftState => {
                        draftState.cards = this.state.cards.map(c => {
                            return { value: c.value, state: c.state === 'invisible' ? 'invisible' : '' }
                        });
                    });
                    this.setState(nextState);
                }, config.DELAY)
                this.setState(this.getNextStateForFlip(clickedCardValue));
            }
        }
        // 4. Flip a given card
        else {
            this.setState(this.getNextStateForFlip(clickedCardValue));
        }
    }

    componentDidUpdate(prevProps: ICardContainerProps) {
        const visibleCards = this.state.cards.filter(c => c.state !== 'invisible')
        if (visibleCards.length === 0) {
            if (this.props.cardValues === prevProps.cardValues) {
                this.props.outOfCardsHandler(this.props.cardValues);
            }
            // If there are more sounds available, then generate more cards
            else if (this.props.cardValues.length > 0) {
                this.setState({ cards: cardsFromValues(this.props.cardValues) });
            }
        }
    }


    public render() {
        return (
            <div className='card-container'>
                {this.state.cards.map((c) => <FlipCard
                    key={c.value}
                    state={c.state}
                    value={c.value}
                    clickHandler={this.clickHandler} />)}
            </div>
        );
    }
}
