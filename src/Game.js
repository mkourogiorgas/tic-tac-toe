import React from 'react';
import Square from './Square';
import './App.css';

class Game extends React.Component {
	handleSquareClick = (element) => {
		element.currentTarget.style.backgroundColor = 'green';
	}

	render() {
		return (
			<div className='game'>
				<Square id='1' click={this.handleSquareClick.bind(this)}/>
				<Square id='2' click={this.handleSquareClick.bind(this)}/>
				<Square id='3' click={this.handleSquareClick.bind(this)}/>
				<Square id='4' click={this.handleSquareClick.bind(this)}/>
				<Square id='5' click={this.handleSquareClick.bind(this)}/>
				<Square id='6' click={this.handleSquareClick.bind(this)}/>
				<Square id='7' click={this.handleSquareClick.bind(this)}/>
				<Square id='8' click={this.handleSquareClick.bind(this)}/>
				<Square id='9' click={this.handleSquareClick.bind(this)}/>
			</div>
		);
	}
}

export default Game;