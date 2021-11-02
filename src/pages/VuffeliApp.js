import React, {useEffect, useState} from 'react';
import SplashScreen from './SplashScreen';
import MapApp from './MapApp';

const SPLASH_MS = 2800;

const VuffeliApp = () => {
    const [splashScreen, setSplashScreen] = useState(true);
    useEffect(()=>{
	setTimeout(()=>{
	    setSplashScreen(false);
	}, SPLASH_MS);
    }, []);
    return (
	<>
	    {splashScreen &&
		<SplashScreen/>
	    }
	    <MapApp/>
	</>
    );
}; 

export default VuffeliApp;
