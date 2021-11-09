import React from 'react';
import InfoMessage from '../InfoMessage';

const NotImplementedMessage = ({onClose}) => {
    return (
	<InfoMessage>
	    <h1>Not yet implemented</h1> {/*... and quite probably never...*/}
	    <p>Oops! VuffVuff! This functionality is not ready on this prototype</p>
	    <button className='pill-btn' onClick={onClose}>Close</button>
	</InfoMessage>
    );
};

export default NotImplementedMessage;
