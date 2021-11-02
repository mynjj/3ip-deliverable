import React, {useState} from 'react';
import {eventTypes} from '../../lib/events';

const EventsMenu = () => {
    const [eventType, setEventType] = useState(null);
    return (
	<>
	    <h2 className='bar-label'>Type of event:</h2>
	    <div className='bar-container'>
		{eventTypes.map((x, k)=>(
		    <button
			className={`pill-btn ${k===eventType?'selected':''}`}
			onClick={()=>setEventType(j=>j===k?null:k)}
			>
			{x}
		    </button>
		))}
	    </div>
	    <h2 className='bar-label'>When:</h2>
	</>
    );
};

export default EventsMenu;
