import React from 'react';
import Sound from 'react-sound';
import sounds from './sounds';

class SoundManager extends React.Component {
	state = {
		currentSound: sounds[this.props.soundIndex],
		position: 0,
		volume: 100,
		loop: this.props.loop,
		playStatus: this.props.status
	};

	render() {
		const { volume, loop } = this.state;
		return (
			<div>
				{this.state.currentSound && (
					<Sound
						url={this.state.currentSound.url}
						playStatus={this.state.playStatus}
						playFromPosition={this.state.position}
						volume={volume}
						loop={loop}
					/>
				)}
			</div>
		);
	}
}

export default SoundManager;