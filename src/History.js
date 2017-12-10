import React from 'react';

class History extends React.Component {
	render() {
		return (
			<div>

				<div className='history' id={this.props.id} className={this.props.cssClass} onClick={this.props.click}>
					<button>Go to Step {this.id}</button>
				</div>
			</div>	
		);
	}
}

export default History;