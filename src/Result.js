import React from 'react';

class Result extends React.Component {
	render() {
		return (
			 <div className='popup fade-in'>
        <div className='popup_inner fade-in'>
          <div className='announcementTitle fade-in'>
          	{this.props.winner}
          </div>
          <div className='announcement' onClick={this.props.click}>
          	<button>Try Again</button>
          </div>
        </div>
      </div>
		);
	}
}

export default Result;