import React, {useState, useCallback} from 'react';
import {eventTypes} from '../../lib/events';
import moment from 'moment';

const EventsMenu = ({onSearch: onSearchProp, onAdd}) => {
    const [eventType, setEventType] = useState(null);
    const day = moment().add(1, 'day');
    const dayString = day.format('dddd DD/MM/YYYY');
    const onSearch = useCallback(()=>{
	onSearchProp({eventType, day})
    }, [onSearchProp, eventType, day]);
    return (
	<>
	    <h2 className='bar-label'>Type of event:</h2>
	    <div className='bar-container'>
		{eventTypes.map((x, k)=>(
		    <button
			className={`pill-btn ${k===eventType?'selected':''}`}
			onClick={()=>setEventType(j=>j===k?null:k)}
			key={k}
			>
			{x}
		    </button>
		))}
	    </div>
	    <h2 className='bar-label'>When:</h2>
	    <input className='pill-input date-input' value={dayString} onChange={()=>{}}/>
	    <hr/>
	    <div className='bar-container'>
		<button style={{marginTop: '2px'}} className='search-btn pill-btn' onClick={onSearch}>Search!</button>
		<button style={{marginTop: '2px'}} className='search-btn pill-btn' onClick={onAdd}>Add your event!</button>
	    </div>
	</>
    );
};

export default EventsMenu;
