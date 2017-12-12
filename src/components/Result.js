import React from 'react';
import Transition from 'react-transition-group/Transition';

class Result extends React.Component {
	state = {
		showBlock: false,
		entered: false
	};

	toggleState = () => {
		this.setState({ showBlock: !this.state.showBlock, entered: true});
	}
	
	render() {
		if(!this.state.entered) {
			setTimeout(this.toggleState, 100);
		}
	
	return (
			<div className='popup'>
				<Transition in={this.state.showBlock} timeout={1000}>
					{state => (
							<div style={{zIndex: 10, position: 'fixed', width: '30%', left:'35%', 'border':'1px solid #D8C8B3',
																											height: '230px', backgroundColor: 'white', margin: 'auto',
																											top: 0, top:'25%', transition: 'opacity 1s ease-out', 
																											opacity: state === 'exited' ? 0: 1}}> 
								<div className='popupTitle'>{this.props.winner}</div>
								<span className='tryAgain' onClick={this.props.click}>Try Again</span>
							</div>
					)}
				</Transition>
			</div>
		);
	}
}

export default Result;