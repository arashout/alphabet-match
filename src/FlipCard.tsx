import * as React from 'react';
import { Button } from 'reactstrap';
import './FlipCard.css';

export interface IFlipCardProps {
  value: string;
  flipped: boolean;
  clickHandler: (flippedCard: string) => void;
}

export default function FlipCard(props: IFlipCardProps) {
  return (
    <div className={`flip-card ${props.flipped ? 'flipped' : ''}`} onClick={() => props.clickHandler(props.value)}>
      <div className="flipper">
        <div className="front">
        {/* TODO: Add an image here */}
          <Button color='dark' outline={true}><p className='display-2'></p></Button>
        </div>
        <div className="back">
          <Button color='dark' outline={true}><p className='display-2'>{props.value}</p></Button>
        </div>
      </div>
    </div>)

}
