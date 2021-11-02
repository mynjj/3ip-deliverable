import React, {useState} from 'react';
import "./App.css"

const Burger = () => {
    return (
	<div className="main-menu--burger-container">
	    <div className="burger-centercontainer">
		<div className="burger-line"/>
		<div className="burger-line"/>
		<div className="burger-line"/>
	    </div>
	</div>
    );
};

const Menu = () => {
    const [open, setOpen] = useState(false);
    if(!open){
	return <Burger onClick={()=>setOpen(o=>!o)}/>;
    }
    return (
	<div></div>
    );
};

export default Menu;
