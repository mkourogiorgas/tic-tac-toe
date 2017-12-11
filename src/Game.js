import React from 'react';
import Square from './Square';
import {SymbolO, SymbolX} from './Symbols';
import NextPlayer from './NextPlayer.js';
import History from './History.js';
import Result from './Result.js';
import SoundManager from './SoundManager';
import './App.css';

class Game extends React.Component {
	// nextPlayer: next game player, initialized when user selects a symbol,
	// gameBoard: keeps current game's board values into an array,
	// imagesToDraw: gameBoard array translated to images,
	// history: contains all moves completed, as also the sequence of these moves,
	// resultIsOpened: true if result is currently presented,
	// winner: 'X' or 'O' if winner exists
	state = {
		nextPlayer: this.props.firstPlayer,
		gameBoard: Array(9).fill(null),
		imagesToDraw: [],
		history: [],
		resultIsOpened: false,
		winnerMessage: null,
		playSound: false,
	}

	// handles a square's click
	// if square component has already been click does nothing
	// if not updates gameBoard, next player, board images and history
	handleSquareClick = (element) => {
		let imagesToDraw, gameBoard = [...this.state.gameBoard], nextPlayer, historyUpdate;
		if(this.state.gameBoard[element.currentTarget.id] === null) {
			gameBoard[element.currentTarget.id] = this.state.nextPlayer;
			imagesToDraw = this.imagesToDraw(gameBoard);
			nextPlayer = this.changePlayerTurn();
			historyUpdate = this.historyUpdate(gameBoard);
			this.setState({ 
				gameBoard: gameBoard,
				imagesToDraw: imagesToDraw,
				nextPlayer: nextPlayer,
				history: historyUpdate,
				playSound: true,
			})
				

			this.calculateResult(gameBoard);
		}
	}

	// handles a history button click
	// updates gameBoard, next player and board images
	handleHistoryClick = (element) => {
		let nextPlayer, gameBoard, imagesToDraw;
		let updates = new Promise((resolve, reject) => {
			nextPlayer = this.calculateNextPlayer(element);
			gameBoard = this.state.history[element.currentTarget.id];
			imagesToDraw = this.imagesToDraw(gameBoard);

			resolve('updated');
		}); 
		updates.then(
			this.setState({
				nextPlayer: nextPlayer,
				gameBoard: gameBoard,
				imagesToDraw: imagesToDraw,
				playSound: false
			})
		)
	}


	imagesToDraw = (board) => {
		let images = Array(9).fill(null);
		board.forEach((element, index) => {
			if(element !== null)
			images[index] = this.playerToImage(element);
		});
		return images;
	}

	changePlayerTurn = () => {
		let nextPlayer;
		this.state.nextPlayer === 'X' ? nextPlayer = 'O' : nextPlayer = 'X';
		return nextPlayer;
	}

	// updates history based on current game board
	// the function also perfoms one important check
	// checks if user that already returned to a previous history stage, decides to click a different square
	// in this case game changes, and the history array will adapt to new game state
	historyUpdate = (currentBoard) => {
		let history = this.state.history, length = history.length, index = 0;
		currentBoard.forEach((element) => {
			if(element !== null) {
				index++;
			}		
		});
		if(index <= length) {
			for (let i=0; i<= length-index; i++) {
				history.pop();
			}
		}

		history.push(currentBoard)
		return history;
	}

	// matches player to the corresponding image
	playerToImage = (player) => {
		if (player === 'O') {
			return <SymbolO/>;
		} else if (player === 'X') {
			return <SymbolX/>;
		}
	}

	// a click on the board while viewing history will totaly change the game 
	// in this case we have to calcualte who the next player is 
	calculateNextPlayer = (element) => {
		let xNumber = 0, oNumber = 0, nextPlayer;
		this.state.history[element.currentTarget.id].forEach((element) => {
			if(element !==null ) {
				element === 'X' ? xNumber++ : oNumber++;
			}
		});

		if(xNumber > oNumber) {
			nextPlayer = 'O';
		} else if(oNumber > xNumber) {
			nextPlayer = 'X';
		} else if(oNumber === xNumber) {
			nextPlayer = this.props.firstPlayer;
		}
		return nextPlayer;
	}

	calculateResult = (gameBoard) => {
		let symbolsNo = 0;
		const winningLines = [[0, 4, 8], [2, 4, 6], [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8]];
		winningLines.forEach((element, index) => {
			const  [a, b, c] = element;
			if (gameBoard[a] !== null && gameBoard[a] === gameBoard[b] && gameBoard[b] === gameBoard[c]) {
				this.handleResult(gameBoard[a]);
			}
		});

		if(!this.state.winnerMessage) {
			gameBoard.forEach((element, index) => {  
				if(element !== null) {
					symbolsNo++;
				}
				symbolsNo === 9 ? this.handleResult('It\'s a tie') : void(0);

			});
		}

	}

	handleResult = (message) => {
		if(message.length === 1) {
			message = 'Player ' + message + ' Wins';
		}
		this.setState({resultIsOpened: true, winnerMessage: message});
	}

	gameRestart = () => {
		this.setState({
			nextPlayer: this.props.firstPlayer,
			gameBoard: Array(9).fill(null),
			history: [],
			resultIsOpened: false,
			winnerMessage: null,
			playSound: false
		});
	}

	render() {
		let historyClassName;
		const firstPlayerImage = this.playerToImage(this.props.firstPlayer);
		const secondPlayerImage = this.playerToImage(this.props.secondPlayer);

		const nextPlayer = <NextPlayer player={this.state.nextPlayer}/>;
		const board = [...Array(9)].map((x, i) => {
										return (
											<Square key={i} id={i} click={this.handleSquareClick.bind(this)}>
												{this.state.imagesToDraw[i]}
											</Square>
											
										);
									});


		const history = this.state.history.map((x, i) => {
												i % 2 === 0 ? historyClassName = 'leftHistory' : historyClassName = 'rightHistory';
												return (
													<History key={i} id={i} cssClass={historyClassName} click={this.handleHistoryClick.bind(this)}/>

												)
											})
		const result = this.state.resultIsOpened ? <Result winner={this.state.winnerMessage} click={this.gameRestart}/> : null;
		const sound = (this.state.playSound) ? <SoundManager soundIndex={0} loop={false} status={'PLAYING'} /> : null;



		return (
			<div className='game' >
				{nextPlayer}
				<div className='board'>
					{board}
					{sound}
				</div>
				<div className='history'>
					<div className='title'>
						Game History
					</div>
					<div className='leftHistory'>{firstPlayerImage}</div>
					<div className='rightHistory'>{secondPlayerImage}</div>
					{history}
				</div>
				{result}
			</div>
		);
	}
}

export default Game;