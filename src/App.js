import React, {useState} from 'react';
import {StaticMap, MapContext, NavigationControl} from 'react-map-gl';
import DeckGL, {ArcLayer} from 'deck.gl';
import {IconLayer} from '@deck.gl/layers';
import Menu from './Menu';
import "./App.css"


const INITIAL_VIEW_STATE = {
  latitude: 55.66,
  longitude: 12.61,
  zoom: 14,
  bearing: 0,
  pitch: 30
};

const MAP_STYLE = 'https://basemaps.cartocdn.com/gl/positron-nolabels-gl-style/style.json';
const NAV_CONTROL_STYLE = {
  position: 'absolute',
  top: 10,
  left: 10
};

const users = [
    {
	address: {
	    coordinates: [55.6631, 12.61]
	}
    },
    {
	address: {
	    coordinates: [55.6506, 12.6165]
	}
    },
    /*
    {
	address: {
	    coordinates: [55.6760, 12.5788]
	}
    },
    {
	address: {
	    coordinates: [55.691361, 12.594755]
	}
    }
    */
];

const AppOverlay = ({onStartAnimation}) => {
    return (
	<button onClick={onStartAnimation}>Match!</button>
    );
};

const getCoords = i => [...users[i].address.coordinates, 0];
const swap = ([x, y]) => [y, x];

function App() {

    const [arcs, setArcs] = useState([]);

  const layers = [
      new IconLayer({
	  id: 'customers',
	  data: users,
	  pickable: true,
	  iconAtlas: 'https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/icon-atlas.png',
	  iconMapping: {user:{x: 0, y: 0, width: 128, height: 128, mask: true}},
	  getIcon: ()=>'user',
	  //sizeScale: 15,
	  getPosition: (u) => {
	      const coords = u.address.coordinates;
	      return [coords[1], coords[0], 14];
	  },
	  getSize: () => 100,
	  getColor: () => [200,140,0],
	  onClick: (...data)=>console.log('clicked', data)
      }),
      new ArcLayer({
	  id: 'arcs',
	  //data: [{source: users[0].address.coordinates, target: users[1].address.coordinates}],//arcs,
	  data: arcs,
	  getSourcePosition: (a) => swap(a.source),
	  getTargetPosition: (a) => swap(a.target),
	  getSourceColor: [120, 128, 200],
	  getTargetColor: [200, 120, 80],
	  getWidth: 10
      })
  ];

    const startAnimation = () => {
	console.log('starting');
	const sourceIndex = 1;
	const source = getCoords(sourceIndex);
	const target = getCoords(0);
	setArcs([{source, target}])
	console.log('done!');
    };

    console.log([{source: users[0].address.coordinates, target: users[1].address.coordinates}], layers);
  return (
  <>
      <AppOverlay
	  onStartAnimation={startAnimation}
      />
      <Menu/>
    <DeckGL
      initialViewState={INITIAL_VIEW_STATE}
      controller={true}
      layers={layers}
      ContextProvider={MapContext.Provider}
    >
      <StaticMap mapStyle={MAP_STYLE} mapboxApiAccessToken={'pk.eyJ1IjoibXluamoiLCJhIjoiY2tsMHNjeXJuMG90cDJwcGV5d3lvNjc2NSJ9.H22AGIBnUgAtRzj0caZogg'}/>

	{/*zoom and compass*/}
      <NavigationControl style={NAV_CONTROL_STYLE} />
    </DeckGL>
  </>
  );
}

export default App;
