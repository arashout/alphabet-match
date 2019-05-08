import * as React from 'react';
import { Button } from 'reactstrap';
import './FlipCard.css';
import cardCoverImg from './assets/card_cover.png';

export type CardState = '' | 'flipped' | 'invisible';
export type Card = {
  value: string;
  state: CardState;
}

export interface IFlipCardProps extends Card {
  clickHandler: (flippedCard: string) => void;
}

export default function FlipCard(props: IFlipCardProps) {
  return (
    <div
      className={`flip-card ${props.state}`}
      onClick={() => props.clickHandler(props.value)}>
      <div className="flipper">
        <div className="front">
          <div className='card-cover'><img src={cardCoverImg} /></div>
        </div>
        <div className="back">
          <Button color='light'><p className='display-1'>{props.value}</p></Button>
        </div>
      </div>
    </div>)

}
