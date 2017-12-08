import React from 'react';
import './App.css';

const NextPlayer = (props) => {
	return (
		<div className='nextPlayer'>
			Player {props.player} is your turn
		</div>
	);
}

export default NextPlayer;