import React from 'react';
import Game from './Game';
import ChooseSymbol from './ChooseSymbol.js';
import SoundManager from './SoundManager';
import './App.css';


class App extends React.Component {
	state = {
		firstPlayer: null,
		secondPlayer: null
	}


	handleSelectedSymbol = (element) => {
		let firstPlayer = element.currentTarget.id, secondPlayer;
		firstPlayer === 'X' ? secondPlayer = 'O': secondPlayer = 'X';
		this.setState({firstPlayer: firstPlayer, secondPlayer: secondPlayer});
	}

	render() {
		console.log(this.state)
		let componentToRender = this.state.firstPlayer === null ? <ChooseSymbol click={this.handleSelectedSymbol.bind(this)} /> : 
																															<Game firstPlayer={this.state.firstPlayer} secondPlayer={this.state.secondPlayer}/>;
		return (
			<div className="App">
				{componentToRender}
				<SoundManager soundIndex={1} loop={true} status={'PLAYING'}/>
			</div>
		);
	}
}

export default App;
