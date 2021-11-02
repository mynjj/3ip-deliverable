import React from 'react';

const UserManager = ({user, currentUser, onUnselectUser}) => {
    const {name, email, products} = user;
    return (
	<div className='UserManager'>
	    <div className='header'>
		<button onClick={onUnselectUser}>X</button>
		<h1>{name}</h1>
	    </div>
	    <hr/>
	    <div className='user-card-content'>
		<div>
		    <button className='pill-btn'>Send a message</button>
		</div>
		<h2 className='bar-label'>Description:</h2>
		<p>Hi! My doggo is Timmy. We like to run and cycle :P</p>
		{products.length===0?<h2 className='bar-label'>{name} has no products registered</h2>:(
		    <>
			<h2 className='bar-label'>Products:</h2>
			<ul>
			    {products.map(({brand, type}, k)=>(
				<li key={k}>{type} - {brand}</li>
			    ))}
			</ul>
		    </>
		)}
	    </div>
	    

	</div>
    );
};

export default UserManager;
