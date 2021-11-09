import React from 'react';

const UserManager = ({user, currentUser, onUnselectUser}) => {
    const {name, email, products, description} = user;
    const sendMessage = e => {
	window.location = `mailto: ${email}`;
	e.preventDefault();
    };
    return (
	<div className='UserManager'>
	    <div className='header'>
		<button onClick={onUnselectUser}>X</button>
		<h1>{name}</h1>
	    </div>
	    <hr/>
	    <div className='user-card-content'>
		<div>
		    <button onClick={sendMessage} className='pill-btn'>Email ({email})</button>
		</div>
		<h2 className='bar-label'>Description:</h2>
		<p>{description}</p>
		{products.length===0?<h2 className='bar-label'>{name} has no products registered</h2>:(
		    <>
			<h2 className='bar-label'>Products:</h2>
			<ul>
			    {products.map(({brand, type, price}, k)=>(
				<li key={k}>{price===0?'Free':`${price.toFixed(2)}kr.`}: {type} - {brand}</li>
			    ))}
			</ul>
		    </>
		)}
	    </div>
	    

	</div>
    );
};

export default UserManager;
