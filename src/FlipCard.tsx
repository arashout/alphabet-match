import * as React from 'react';
import { Button } from 'reactstrap';
import './FlipCard.css';

export interface IFlipCardProps {
  front: string;
  back: string;
  flipped: boolean;
  clickHandler: (flippedCard: string) => void;
}


export default class FlipCard extends React.PureComponent<IFlipCardProps> {
  constructor(props: IFlipCardProps) {
    super(props);
  }

  public render() {
    return (
      <div className={`flip-card ${this.props.flipped ? 'flipped' : ''}`} onClick={() => this.props.clickHandler(this.props.back)}>
        <div className="flipper">
          <div className="front">
            <Button color='dark' outline={true}><p className='display-2'>{this.props.front}</p></Button>
          </div>
          <div className="back">
            <Button color='dark' outline={true}><p className='display-2'>{this.props.back}</p></Button>
          </div>
        </div>
      </div>)

  }
}
