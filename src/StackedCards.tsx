import * as React from "react";
import styled from "styled-components";
import FlipCard from "./FlipCard";
import './StackedCards.css'
import audioPlayer from './AudioPlayer';

// vmin
const _defaultDiff = 3;
const _cardWidth = 160;
const _narrowingAmount = 3;

// TODO: Get rid of styled components
function generateStackingCSS(children: any[]): string {
  let cssString = '';
  const n = children.length;
  for (let i = 1; i <= n; i++) {
    cssString += `.stacked-card:nth-last-child(${i}) {
    position: absolute;
    top: ${_defaultDiff * (n - i)}px;
    width: ${_cardWidth - _narrowingAmount * i}px;
    max-width: 200px;
  }`
  }
  return cssString;
}
const StackedCardConainerStyled = styled.div`
  position: relative;
  width: 20vmin;
  height: 25vmin;
  ${(props: any) => generateStackingCSS(props.children)}
`;

export interface IStackedCardsProps {
  cardValues: string[];
}


export default function StackedCards(props: IStackedCardsProps) {
  return (
    <div className='stacked-card-container d-flex justify-content-center align-items-center'>
      <div className='display-3 text-dark m-3'>{props.cardValues.length}</div>
      <StackedCardConainerStyled>
        {props.cardValues.map((cv, i) => <FlipCard className='stacked-card'
          key={cv} value={cv} state='flipped' clickHandler={() => audioPlayer.play(cv[0].toLowerCase())} />)}
      </StackedCardConainerStyled>
    </div>

  );

}