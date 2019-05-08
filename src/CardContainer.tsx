import * as React from 'react';
import './CardContainer.css';
import FlipCard, { Card } from './FlipCard';
import produce from 'immer';
import config from './config';
import { deepCopy } from './impl';

export interface ICardContainerProps {
    cardValues: string[],
    outOfCardsHandler: (cardsUsed: string[]) => void;
    successHandler: (card: string) => void;
    audioPlayer: (sound: string) => void;
}

export interface ICardContainerState {
    cards: Card[];

}

/**
 * Toggles the flipped state of a card but leaves invisible
 * @param card 
 */
function toggleFlip(card: Card): Card {
    if (card.state === 'invisible') {
        return card;
    } else {
        return { value: card.value, state: card.state === 'flipped' ? '' : 'flipped' };
    }
}

function cardsFromValues(values: string[]): Card[] {
    return values.map((c) => { return { value: c, state: '' } });
}

export default class CardContainer extends React.Component<ICardContainerProps, ICardContainerState> {
    constructor(props: ICardContainerProps) {
        super(props);

        this.state = { cards: cardsFromValues(this.props.cardValues) };
    }

    getNextStateForFlip = (cardValue: string): ICardContainerState => {
        const i = this.state.cards.map((c) => c.value).indexOf(cardValue);
        console.assert(i !== -1, 'Could not find element');

        this.props.audioPlayer(cardValue.toLowerCase());

        const card = this.state.cards[i];
        return produce(this.state, draftState => {
            draftState.cards[i] = toggleFlip(card);
        });
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
