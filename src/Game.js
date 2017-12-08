import React from 'react';
import Square from './Square';
import {SymbolO, SymbolX} from './Symbols';
import NextPlayer from './NextPlayer.js'
import './App.css';

class Game extends React.Component {

	state = {
		nextPlayer: 'X',
		// array that keeps current game's history
		gameBoard: Array(9).fill(null)
	}

	handleSquareClick = (element) => {
		// match component with index of game board array
		let arrayIndex = element.currentTarget.id;
		// check if component has already been clicked
		// if yes do nothing 
		if(this.state.gameBoard[arrayIndex] === null) {
			let gameBoard = [...this.state.gameBoard];
			gameBoard[arrayIndex] = this.state.nextPlayer;
			this.setState({gameBoard: gameBoard});
			this.changePlayerTurn();
		}
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
				<NextPlayer player={this.state.nextPlayer}/>
				<div className="board">
					{[...Array(9)].map((x, i) =>
						<Square key={i} id={i} click={this.handleSquareClick.bind(this)} >
							{symbolsToRender[i]}
						</Square>
					)}
				</div>
			</div>
		);
	}
}

export default Game;