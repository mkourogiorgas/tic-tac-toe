import React from 'react';

class Square extends React.Component {
	render() {
		return (
			<div id={'square'+this.props.id} className='square' onClick={this.props.click}>
			</div>
		);
	}
}

export default Square;