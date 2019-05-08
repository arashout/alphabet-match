import * as React from 'react';
import './FlipCard.css';
import cardCoverImg from './assets/card_cover.jpg';

export type CardState = '' | 'flipped' | 'invisible';
export type Card = {
  value: string;
  state: CardState;
}

export interface IFlipCardProps extends Card {
  clickHandler: (flippedCard: string) => void;
}

export default function FlipCard(props: IFlipCardProps) {
  // return (
  //   <div
  //     className={`flip-card ${props.state}`}
  //     onClick={() => props.clickHandler(props.value)}>
  //     <div className="flipper">
  //       <div className="front">
  //         <div className='card-cover'><img src={cardCoverImg} /></div>
  //       </div>
  //       <div className="back">
  //         <Button color='light'><p className='display-1'>{props.value}</p></Button>
  //       </div>
  //     </div>
  //   </div>)

  return (<div className="scene scene--card">
    <div className={`card ${props.state}`} onClick={() => props.clickHandler(props.value)} >
      <div className="card__face card__face--front"><img src={cardCoverImg} /></div>
      <div className="card__face card__face--back d-flex justify-content-center flex-column">
        <p className='display-1 text-dark'>{props.value}</p>
      </div>
    </div>
  </div>)

}
