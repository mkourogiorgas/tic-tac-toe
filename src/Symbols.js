import React from 'react';
import symbolX from './assets/images/symbolX.png';
import symbolO from './assets/images/symbolO.png';

const SymbolX = () => {
	return (
		<div className='symbolX'>
			<img src={symbolX} alt='symbol x'/>
		</div>
	)
}

const SymbolO = () => {
	return (
		<div className='symbolO'>
			<img src={symbolO} alt='symbol o'/>
		</div>
	)
}


export {SymbolX, SymbolO};