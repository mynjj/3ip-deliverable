import React, {useState, useMemo, useCallback} from 'react';
import {StaticMap, MapContext, NavigationControl} from 'react-map-gl';
import UserManager from '../UserManager';
import DeckGL from 'deck.gl';
import {IconLayer} from '@deck.gl/layers';
import MarkerAtlas from './marker-atlas.png';
import {swap} from '../../lib/manip';
import {sampleUsers} from '../../lib/users';
import TopBar from '../../components/TopBar';
import Loading from '../../components/Loading';
import NotImplementedMessage from '../../components/NotImplementedMessage';
import FoundEventMessage from '../../components/FoundEventMessage';
import {brands, types} from '../../lib/products';
import {eventCoordinates} from '../../lib/events';


const DEF_ZOOM_LEVEL = 14;
const MAPBOX_API_TOKEN = 'pk.eyJ1IjoibXluamoiLCJhIjoiY2tsMHNjeXJuMG90cDJwcGV5d3lvNjc2NSJ9.H22AGIBnUgAtRzj0caZogg';
const MAP_STYLE = 'https://basemaps.cartocdn.com/gl/positron-nolabels-gl-style/style.json';
const NAV_CONTROL_STYLE={position: 'absolute', top: 65, left: 10};

const DEF_ICON_MAPPING = {
    y: 0,
    width: 169,
    height: 199,
    anchorY: 199
};
const ICON_MAPPING = {
    current: {x: 0, ...DEF_ICON_MAPPING}, // mask for user defined colors
    otherUsers: {x: 169, ...DEF_ICON_MAPPING},
    event: {x: 338, ...DEF_ICON_MAPPING}
}

const initialView = u => ({
    latitude: u.coordinates[0],
    longitude: u.coordinates[1],
    zoom: DEF_ZOOM_LEVEL,
    bearing: 0,
    pitch: 30
});

const getIconLayer = ({
    users,
    selectedUserIndex,
    onUserSelected,
    showingEvent,
    onEventSelected
}) => {
    const currentUser = users[0];
    return new IconLayer({
	id: 'icon-layer',
	data: [
	    {
		...currentUser,
		current: true
	    },
	    ...users.slice(1),
	    ...showingEvent?[{
		event: true,
		coordinates: eventCoordinates
	    }]:[],
	],
	pickable: true,
	iconAtlas: MarkerAtlas,
	iconMapping: ICON_MAPPING,
	getIcon: ({current, event})=>current?'current':event?'event':'otherUsers',
	getPosition: ({coordinates})=>[...swap(coordinates)],
	getSize: ({current, event}, {index})=>{
	    if(current) return 100;
	    if(index === selectedUserIndex || event) return 80;
	    return 50;
	},
	getColor: () => [240 ,140, 0],
	onClick: ({index, object})=>{
	    if(index!==selectedUserIndex){
		if(object.event){
		    onEventSelected();
		}
		else{
		    onUserSelected(index, object);
		}
	    }
	}
    });
};

const messages = {
    'not-implemented': NotImplementedMessage,
    'found-event': FoundEventMessage
};

const MapApp = () => {
    const allUsers = useMemo(()=>sampleUsers, []);
    const [userFilter, setUserFilter] = useState(null);
    const [message, setMessage] = useState(null);
    const [showingEvent, setShowingEvent] = useState(false);
    const users = useMemo(() => {
	if(!userFilter){
	    return allUsers;
	}
	const {brand, type, belowPrice} = userFilter;
	return allUsers.filter(({products}, k)=>{
	    if(k===0){
		return true;
	    }
	    return products.map(({brand: cBrand, type: cType, price: cPrice})=>
		(brand===null || brands[brand]===cBrand) &&
		(type===null || types[type]===cType) &&
		(belowPrice===null || belowPrice<cPrice)
	    ).reduce((x, y)=>x||y, false);
	});
    }, [allUsers, userFilter]);
    const filterData = useMemo(()=>({
	userFilter,
	totalUsers: allUsers.length,
	shownUsers: users.length
    }), [allUsers, users, userFilter]);
    const [selectedUserIndex, setSelectedUserIndex] = useState(null);
    const [loading, setLoading] = useState(false);
    const onUserSelected = useCallback((index, user) => {
	setSelectedUserIndex(index);
    }, []);
    const onEventSelected = useCallback(()=>{
	setMessage('found-event');
    }, []);
    const iconLayer = useMemo(
	()=>getIconLayer({
	    users,
	    selectedUserIndex,
	    showingEvent,
	    onUserSelected,
	    onEventSelected
	}), [selectedUserIndex, users, onUserSelected, showingEvent, onEventSelected]
    );
    const layers = [iconLayer];
    const onSearch = useCallback((searchType, searchData)=>{
	setLoading(true);
	setTimeout(()=>{
	    setLoading(false);
	    if(searchType === 'Products'){
		setUserFilter(searchData);
	    }
	    if(searchType === 'Events'){
		setMessage('found-event');
		setShowingEvent(true);
	    }
	}, 1000);
    }, []);
    const onAdd = useCallback(() => {
	setMessage('not-implemented');
    }, []);
    const MessageComponent = message&&messages[message];
    return (
	<div className='MapApp'>
	    {loading&&<Loading/>}
	    {message&&(<MessageComponent onClose={()=>setMessage(null)}/>)}
	    {(selectedUserIndex!==null)&&(
		<UserManager
		    user={users[selectedUserIndex]}
		    currentUser={selectedUserIndex===0}
		    onUnselectUser={()=>setSelectedUserIndex(null)}
		/>
	    )}
	    <TopBar
		onSearch={onSearch}
		onAdd={onAdd}
		data={filterData}
	    />
	    <DeckGL
		initialViewState={initialView(users[0])}
		controller={true}
		layers={layers}
		ContextProvider={MapContext.Provider}
	    >
		<StaticMap
		    mapboxApiAccessToken={MAPBOX_API_TOKEN}
		    mapStyle={MAP_STYLE}
		/>
		{/*zoom and compass*/}
		<NavigationControl style={NAV_CONTROL_STYLE}/>
	    </DeckGL>
	</div>
    );
};

export default MapApp;
