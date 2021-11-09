import React from 'react';
import InfoMessage from '../InfoMessage';
import {sampleUsers} from '../../lib/users';

const organizer = sampleUsers[1+Math.floor(Math.random()*sampleUsers.length-1)];
const FoundEventMessage = ({onClose}) => {
    return (
	<InfoMessage>
	    <h1>We found an event for you!</h1>
	    <p>There's a nice dog party near you for that date</p>
	    <div className='lalign'>
		<p>Details:</p>
		<ul>
		    <li>Organizer: {organizer.name}({organizer.dog.name})</li>
		    <li>Description: It's {organizer.dog.name} birthday! come with us, we're going to have great fun :)</li>
		</ul>
	    </div>
	    <button className='pill-btn' onClick={onClose}>Close</button>
	</InfoMessage>
    );
};

export default FoundEventMessage;
