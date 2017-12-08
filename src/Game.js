import React from 'react';
import Square from './Square';
import {SymbolO, SymbolX} from './Symbols';
import './App.css';

class Game extends React.Component {


	handleSquareClick = (element) => {
    element.currentTarget.style.backgroundColor = 'green';
	}

	render() {
		let symbolsToRender = Array(9);
		for (let i=0; i<symbolsToRender.length; i++) {
			symbolsToRender[i] = <SymbolO/>;
		}

		return (
			<div className='game'>
				{[...Array(9)].map((x, i) =>
					<Square key={i} id={i} click={this.handleSquareClick.bind(this)} >
						{symbolsToRender[i]}
					</Square>
				)}
			</div>
		);
	}
}

export default Game;