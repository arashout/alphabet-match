import * as React from 'react';
import './CardContainer.css';
import FlipCard from './FlipCard';
import produce from 'immer';
import config from './config';
import { deepCopy } from './impl';

export interface ICardContainerProps {
    cards: string[],
    outOfCardsHandler: (cardsUsed: string[]) => void;
    successHandler: (card: string) => void;
    audioPlayer: (sound: string) => void;
}

export interface ICardContainerState {
    remainingCards: { card: string, flipped: boolean }[];

}

export default class CardContainer extends React.Component<ICardContainerProps, ICardContainerState> {
    constructor(props: ICardContainerProps) {
        super(props);


        this.state = {
            remainingCards: this.props.cards.map((c) => { return { card: c, flipped: false } }),
        };
    }

    getNextStateForFlip = (card: string): ICardContainerState => {
        const i = this.state.remainingCards.map((cf) => cf.card).indexOf(card);
        console.assert(i !== -1, 'Could not find element');

        this.props.audioPlayer(card.toLowerCase());

        return produce(this.state, draftState => {
            draftState.remainingCards[i].flipped = !draftState.remainingCards[i].flipped;
        });
    }

    clickHandler = (clickedCard: string) => {
        const flippedCards = this.state.remainingCards.filter(cf => cf.flipped);
        // Return early if we are in the process of flipped cards
        if (flippedCards.length > 1) {
            return;
        }
        console.assert(flippedCards.length < 2, 'Too many unflipped cards!');

        if (flippedCards.length === 1) {
            // 1. Trying to unflip flipped card
            const flippedCard = flippedCards[0].card;
            if (flippedCard === clickedCard) {
                this.setState(this.getNextStateForFlip(flippedCard));
            }
            // 2. Unflipped a matching card, briefly show match then remove
            else if (flippedCard.toLowerCase() === clickedCard.toLowerCase()) {
                setTimeout(() => {
                    const nextState = produce(this.state, draftState => {
                        draftState.remainingCards = this.state.remainingCards.filter((cf) => !cf.flipped);
                    });
                    this.props.successHandler(clickedCard);
                    this.setState(nextState);
                }, config.DELAY)
                this.setState(this.getNextStateForFlip(clickedCard));
            }
            // 3. Unflipped non-matching card, briefly show then unflip both
            else {
                setTimeout(() => {
                    const nextState = produce(this.state, draftState => {
                        draftState.remainingCards = this.state.remainingCards.map(cf => { return { card: cf.card, flipped: false } });
                    });
                    this.setState(nextState);
                }, config.DELAY)
                this.setState(this.getNextStateForFlip(clickedCard));
            }
        }
        // 4. Flip a given card
        else {
            this.setState(this.getNextStateForFlip(clickedCard));
        }
    }

    componentDidUpdate(prevProps: ICardContainerProps) {
        if (this.state.remainingCards.length === 0) {
            if (this.props.cards === prevProps.cards) {
                this.props.outOfCardsHandler(this.props.cards);
            }
            else {
                this.setState({ remainingCards: this.props.cards.map((c) => { return { card: c, flipped: false } }) });
            }

        }
    }


    public render() {
        return (
            <div className='card-container'>
                {this.state.remainingCards.map((cf) => <FlipCard
                    key={cf.card}
                    flipped={cf.flipped}
                    value={cf.card}
                    clickHandler={this.clickHandler} />)}
            </div>
        );
    }
}
