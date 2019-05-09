import * as React from "react";
import styled from "styled-components";
import FlipCard from "./FlipCard";
import './StackedCards.css'

// vmin
const _defaultDiff = 0.5;
const _cardWidth = 20;
const _narrowingAmount = 0.5;

// TODO: Get rid of styled components
function generateStackingCSS(children: any[]): string {
  let cssString = '';
  const n = children.length;
  for (let i = 1; i <= n; i++) {
    cssString += `.stacked-card:nth-last-child(${i}) {
    position: absolute;
    top: ${_defaultDiff * (n - i)}vmin;
    width: ${_cardWidth - _narrowingAmount * i}vmin;
    max-width: 200px;
  }`
  }
  return cssString;
}
const StackedCardConainerStyled = styled.div`
  position: relative;
  width: 22vmin;
  height: 30vmin;
  ${(props: any) => generateStackingCSS(props.children)}
`;

export interface IStackedCardsProps {
  cardValues: string[];
}


export default function StackedCards(props: IStackedCardsProps) {
  return (
    <div className='stacked-card-container d-flex flex-column justify-content-center align-items-center'>
      <div className='display-3 text-dark'>{props.cardValues.length}</div>
      <StackedCardConainerStyled >
        {props.cardValues.map((cv, i) => <FlipCard className='stacked-card'
          key={cv} value={cv} state='flipped' clickHandler={() => console.log("clicked")} />)}
      </StackedCardConainerStyled>

    </div>

  );

}