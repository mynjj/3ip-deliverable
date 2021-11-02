import React, {useState, useMemo, useCallback} from 'react';
import {StaticMap, MapContext, NavigationControl} from 'react-map-gl';
import UserManager from '../UserManager';
import faker from 'faker';
import _ from 'lodash/fp';
import DeckGL from 'deck.gl';
import {IconLayer} from '@deck.gl/layers';
import MarkerAtlas from './marker-atlas.png';
import {swap} from '../../lib/manip';
import {FakeProduct} from '../../lib/products';
import TopBar from '../../components/TopBar';


const N_USERS = 40;
const DEF_ZOOM_LEVEL = 14;
const MAPBOX_API_TOKEN = 'pk.eyJ1IjoibXluamoiLCJhIjoiY2tsMHNjeXJuMG90cDJwcGV5d3lvNjc2NSJ9.H22AGIBnUgAtRzj0caZogg';
const MAP_STYLE = 'https://basemaps.cartocdn.com/gl/positron-nolabels-gl-style/style.json';
const NAV_CONTROL_STYLE={position: 'absolute', top: 65, left: 10};

const DEF_ICON_MAPPING = {
    width: 169,
    height: 199,
    anchorY: 199
};
const ICON_MAPPING = {
    current: {x: 0, y:0, ...DEF_ICON_MAPPING}, // mask for user defined colors
    otherUsers: {x: 169, y: 0, ...DEF_ICON_MAPPING}
}

const currentUser = {
    name: 'Nick Brown',
    email: 'nicky-b@hotmail.com',
    coordinates: [55.707782, 12.562532],
    products: []
}

function FakeUser(){
    this.name = faker.name.findName();
    this.email = faker.internet.email();
    this.coordinates = faker.address.nearbyGPSCoordinate(currentUser.coordinates, Math.random()*9, true).map(x=>parseFloat(x));

    const nProducts = Math.floor(Math.random()*4);
    this.products = _.times(()=>new FakeProduct(), nProducts)
};

const initialView = u => ({
    latitude: u.coordinates[0],
    longitude: u.coordinates[1],
    zoom: DEF_ZOOM_LEVEL,
    bearing: 0,
    pitch: 30
});

const sampleUsers = _.times(()=>new FakeUser(), N_USERS);

const usersToIconLayer = ({
    users,
    currentUser,
    selectedUserIndex,
    onUserSelected
}) => new IconLayer({
    id: 'users-layer',
    data: [
	{
	    ...currentUser,
	    current: true
	},
	...users
    ],
    pickable: true,
    iconAtlas: MarkerAtlas,
    iconMapping: ICON_MAPPING,
    getIcon: ({current})=>current?'current':'otherUsers',
    getPosition: ({coordinates})=>[...swap(coordinates)],
    getSize: ({current}, {index})=>{
	if(current) return 100;
	if(index === selectedUserIndex) return 80;
	return 50;
    },
    getColor: () => [240 ,140, 0],
    onClick: ({index, object})=>{
	if(index!==selectedUserIndex){
	    onUserSelected(index, object);
	}
    }
});

const MapApp = () => {
    const [users, setUsers] = useState(sampleUsers);
    const [selectedUserIndex, setSelectedUserIndex] = useState(null);
    const onUserSelected = useCallback((index, user) => {
	setSelectedUserIndex(index);
    }, []);
    const iconLayer = useMemo(
	()=>usersToIconLayer({
	    users,
	    currentUser,
	    selectedUserIndex,
	    onUserSelected
	}), [selectedUserIndex, users, onUserSelected]
    );
    const layers = [iconLayer];
    return (
	<div className='MapApp'>
	    {(selectedUserIndex!==null)&&(
		<UserManager
		    user={users[selectedUserIndex]}
		    currentUser={selectedUserIndex===0}
		    onUnselectUser={()=>setSelectedUserIndex(null)}
		/>
	    )}
	    <TopBar/>
	    <DeckGL
		initialViewState={initialView(currentUser)}
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
