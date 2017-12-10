import React from 'react';
import Square from './Square';
import {SymbolO, SymbolX} from './Symbols';
import NextPlayer from './NextPlayer.js'
import History from './History.js'
import './App.css';

class Game extends React.Component {

	// nextPlayer: next game player, initialized when user selects a symbol
	// gameBoard: saves current game's board values into an array
	// history: contains all moves completed, as also the sequence of these moves
	state = {
		nextPlayer: this.props.firstPlayer,
		gameBoard: Array(9).fill(null),
		history: []
	}


	// matches player to the corresponding image
	playerToImage = (player) => {
		if (player === 'O') {
			return <SymbolO/>;
		} else if (player === 'X') {
			return <SymbolX/>;
		}
	}

	// handles square click
	// if square component has already been click does nothing
	// if not updates gameBoard, next player and history
	handleSquareClick = (element) => {
		let arrayIndex = element.currentTarget.id;
		if(this.state.gameBoard[arrayIndex] === null) {
			let gameBoard = [...this.state.gameBoard];
			gameBoard[arrayIndex] = this.state.nextPlayer;
			this.setState({gameBoard: gameBoard});
			this.changePlayerTurn();
			this.updateHistory(gameBoard);
		}
	}

	changePlayerTurn = () => {
		this.state.nextPlayer === 'X' ? this.setState({nextPlayer:'O'}) : this.setState({nextPlayer:'X'});
	}

	// updates history based on current game board
	// the function also perfoms one important check
	// checks if user while have already returned to a previous history stage decides to click a different square
	// in this case the game will change, and the history array must adapt to new game state
	updateHistory = (currentBoard) => {
		let index = 0, history = this.state.history, length = history.length;;
		currentBoard.forEach((element) => {
			if(element !== null) {
				index++;
			}		
		});

		if(index < history.length) {
			for (let i=0; i <= length-index; i++) {
				history.pop();
			}
			this.setState({history: history});
		}
		history.push(currentBoard)
		this.setState({history: history});
	}

	handleHistoryClick = (element) => {
		this.calculateNextPlayer(element);
		this.setState({gameBoard : this.state.history[element.currentTarget.id]});
	}

	// a click on the board while viewing history will totaly change the game 
	// in this case we must know who the next player is 
	calculateNextPlayer = (element) => {
		let xNumber = 0, oNumber = 0;
		this.state.history[element.currentTarget.id].forEach((element) => {
			if(element!==null) {
				element === 'X' ? xNumber++ : oNumber++;
			}
		});

		if(xNumber > oNumber) {
			this.setState({nextPlayer:'O'});
		} else if(oNumber > xNumber) {
			this.setState({nextPlayer:'X'});
		} else if(oNumber === xNumber) {
			this.setState({nextPlayer:this.props.firstPlayer});
		}
	}

	render() {
		let symbolsToRender = [], historyClassName;
		const firstPlayerImage = this.playerToImage(this.props.firstPlayer);
		const secondPlayerImage = this.playerToImage(this.props.secondPlayer);

		this.state.gameBoard.forEach((element, index) => {
			symbolsToRender[index] = this.playerToImage(element)
		});	

		const nextPlayer = <NextPlayer player={this.state.nextPlayer}/>

		const board = [...Array(9)].map((x, i) => {
										return (
											<Square key={i} id={i} click={this.handleSquareClick.bind(this)} >
												{symbolsToRender[i]}
											</Square>
										);
									});

		const history = this.state.history.map((x, i) => {
												i % 2 === 0 ? historyClassName = 'leftHistory' : historyClassName = 'rightHistory';
												return (
													<History key={i} id={i} cssClass={historyClassName} click={this.handleHistoryClick.bind(this)}/>
												)
											})


		return (
			<div className='game' >
				{nextPlayer}
				<div className='board'>
					{board}
				</div>
				<div className='history'>
					<div className='title'>
						Game History
					</div>
					<div className='leftHistory'>{firstPlayerImage}</div>
					<div className='rightHistory'>{secondPlayerImage}</div>
					{history}
				</div>
			</div>
		);
	}
}

export default Game;