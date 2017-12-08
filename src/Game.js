import React from 'react';
import Square from './Square';
import {SymbolO, SymbolX} from './Symbols';
import './App.css';

class Game extends React.Component {

	state = {
		nextPlayer: 'X',
		// array that keeps current game's history
		gameBoard: Array(9).fill(null)
	}

	handleSquareClick = (element) => {
		let gameBoard = [...this.state.gameBoard];
		gameBoard[element.currentTarget.id] = this.state.nextPlayer;
		this.setState({gameBoard: gameBoard});
		this.changePlayerTurn();
	}

	changePlayerTurn = () => {
		this.state.nextPlayer === 'X' ? this.setState({nextPlayer:'O'}) : this.setState({nextPlayer:'X'});
	}

	render() {
		let symbolsToRender = [];
		
		this.state.gameBoard.forEach((element, index) => {
			if (element === 'O') {
				symbolsToRender[index] = <SymbolO/>;
			} else if (element === 'X') {
				symbolsToRender[index] = <SymbolX/>;
			}
		});	

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