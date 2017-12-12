import React from 'react';
import symbolX from '../assets/images/X.png';
import symbolO from '../assets/images/O.png';
import '../App.css';

class ChooseSymbol extends React.Component {

	render() {
		return (
			<div className='overlay'>
				<div className='mainTitle'>Tic Tac Toe</div>
				<div className='overlay-text'>
					<div className='overlay-title'>
						Player One Please Choose Symbol 
					</div>
					<div className='overlay-image'>
						<img id='X' src={symbolX} alt='symbol x' onClick={this.props.click} />
					</div>	
					<div className='overlay-image'>	
						<img id='O' src={symbolO} alt='symbol o' onClick={this.props.click} />
					</div>
				</div>
			</div>
		);
	}
}

export default ChooseSymbol;