import * as React from 'react';
import './FlipCard.css';
import cardCoverImg from './assets/images/card_cover.jpg'
import { isiOS } from './shared';

export type CardState = '' | 'flipped' | 'invisible';
export type Card = {
  value: string;
  state: CardState;
  className?: string;
}

export interface IFlipCardProps extends Card {
  clickHandler: (flippedCard: string) => void;
}

export default function FlipCard(props: IFlipCardProps) {
  if (isiOS()) {
    let content;
    if (props.state === 'flipped') {
      content = (<div className="card-ne--back d-flex justify-content-center flex-column">
        <p className='display-1 text-dark'>{props.value}</p>
      </div>);
    }
    else {
      content = (<div className="card-ne--front"><img src={cardCoverImg} /></div>);
    }
    return (<div className={`scene-ne  ${props.className || ''}`}>
      <div className={`card-ne ${props.state}`} onClick={() => props.clickHandler(props.value)} >
        {content}
      </div>
    </div>);
  } 
  
  else {
    return (<div className={`scene scene--card  ${props.className || ''}`}>
      <div className={`card ${props.state}`} onClick={() => props.clickHandler(props.value)} >
        <div className="card__face card__face--front"><img src={cardCoverImg} /></div>
        <div className="card__face card__face--back d-flex justify-content-center flex-column">
          <p className='display-1 text-dark'>{props.value}</p>
        </div>
      </div>
    </div>);
  }
}
