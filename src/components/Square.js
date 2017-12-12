import React from 'react';

class Square extends React.Component {
	render() {
		return (
			<div id={this.props.id} className='square' onClick={this.props.click}>
				{this.props.children}
			</div>
		);
	}
}

export default Square;