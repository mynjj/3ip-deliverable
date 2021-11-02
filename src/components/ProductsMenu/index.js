import React, {useState} from 'react';
import {brands, types} from '../../lib/products';

const ProductsMenu = () => {
    const [brand, setBrand] = useState(null);
    const [type, setType] = useState(null);
    const [belowPrice, setBelowPrice] = useState(null);
    return (
	<>
	    <h2 className='bar-label'>Brand:</h2>
	    <div className='bar-container'>
		{brands.map((x, k)=>(
		    <button
			className={`pill-btn ${k===brand?'selected':''}`}
			onClick={()=>setBrand(j=>j===k?null:k)}
			>
			{x}
		    </button>
		))}
	    </div>
	    <h2 className='bar-label'>Type:</h2>
	    <div className='bar-container'>
		{types.map((x, k)=>(
		    <button
			className={`pill-btn ${k===type?'selected':''}`}
			onClick={()=>setType(j=>j===k?null:k)}
			>
			{x}
		    </button>
		))}
	    </div>
	    <h2 className='bar-label'>Price:</h2>
	    <div className='bar-container'>
		<button
		    className={`pill-btn ${belowPrice===null?'selected':''}`}
		    onClick={()=>setBelowPrice(null)}
		>
		    Any
		</button>
		<button
		    className={`pill-btn ${belowPrice!==null?'selected':''}`}
		    onClick={()=>setBelowPrice(100)}
		    >
		    Below
		</button>
		{belowPrice!==null&&(
		    <>
			<input
			    className='pill-input'
			    value={belowPrice}
			    type='number'
			    onChange={(e)=>setBelowPrice(e.target.value)}
			/>
			<h4>kr.</h4>
		    </>
		)}
	    </div>
	    <hr/>
	    <div className='bar-container' >
		<button style={{marginTop: '2px'}} className='search-btn pill-btn'>Filter</button>
		<button style={{marginTop: '2px'}} className='search-btn pill-btn'>Add your product</button>
	    </div>
	</>
    );
};

export default ProductsMenu;
