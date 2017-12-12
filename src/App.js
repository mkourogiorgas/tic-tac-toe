import React from 'react';
import Game from './components/Game';
import ChooseSymbol from './components/ChooseSymbol';
import SoundManager from './components/SoundManager';
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
		const componentToRender = this.state.firstPlayer === null ? <ChooseSymbol click={this.handleSelectedSymbol.bind(this)} /> : 
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
