import React from 'react';
import {SymbolX, SymbolO} from './Symbols';

class Square extends React.Component {
	render() {
		return (
			<div id={this.props.id} className='square' onClick={this.props.click}>
			</div>
		);
	}
}

export default Square;