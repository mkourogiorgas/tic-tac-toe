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
				{[...Array(9)].map((x, i) =>
					<Square key={i} id={i} click={this.handleSquareClick.bind(this)} >
					</Square>
 				)}
			</div>
		);
	}
}

export default Game;