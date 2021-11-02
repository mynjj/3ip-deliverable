import React, {useState} from 'react';
import EventsMenu from '../EventsMenu';
import ProductsMenu from '../ProductsMenu';

const topMenuOptions = [
    {name: 'Events', Component: EventsMenu},
    {name: 'Products', Component: ProductsMenu}
];
const TopBar = () => {
    const [topSelected, setTopSelected] = useState(null);
    const selected = k => topSelected === k;
    const SelectedComponent = (topSelected!==null)&&topMenuOptions[topSelected].Component;
    return (
	<div className='TopBar'>
	    <div className='top-bar-content bar-container'>
		{topMenuOptions.map(({name}, k)=>(
		    <button
			key={k}
			onClick={()=>{
			    setTopSelected(j=>j===k?null:k)
			}}
			className={`pill-btn ${selected(k)?'selected':''}`}>
			{name}
		    </button>
		))}
	    </div>
	    <div className='top-bar-content'>
		{SelectedComponent&&<SelectedComponent/>}
	    </div>
	</div>
    );
};

export default TopBar;
