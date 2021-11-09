import React, {useState, useCallback} from 'react';
import {brands, types} from '../../lib/products';

const getFilterValues = (key, productsFilter) => {
    if(!productsFilter) return null;
    return productsFilter[key];
};

const ProductsMenu = ({data: {userFilter: productsFilter}, onSearch: onSearchProp, onAdd: onAddProp}) => {
    const [brand, setBrand] = useState(getFilterValues('brand', productsFilter));
    const [type, setType] = useState(getFilterValues('type', productsFilter));
    const [belowPrice, setBelowPrice] = useState(getFilterValues('belowPrice', productsFilter));
    const onSearch = useCallback(()=>{
	let v = {brand, type, belowPrice};
	if(brand===null&&type===null&&belowPrice===null) v = null;
	onSearchProp(v)
    }, [onSearchProp, brand, type, belowPrice]);
    const onAdd = () => {
	onAddProp()
    };
    return (
	<>
	    <h2 className='bar-label'>Brand:</h2>
	    <div className='bar-container'>
		{brands.map((x, k)=>(
		    <button
			className={`pill-btn ${k===brand?'selected':''}`}
			onClick={()=>setBrand(j=>j===k?null:k)}
			key={k}
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
			key={k}
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
		    className={`pill-btn ${belowPrice===0?'selected':''}`}
		    onClick={()=>setBelowPrice(0)}
		    >
		    Free
		</button>
		<button
		    className={`pill-btn ${belowPrice!==null&&belowPrice!==0?'selected':''}`}
		    onClick={()=>setBelowPrice(100)}
		    >
		    Below
		</button>
		{belowPrice!==null&&belowPrice!==0&&(
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
		<button style={{marginTop: '2px'}} className='search-btn pill-btn' onClick={onSearch}>Search!</button>
		<button style={{marginTop: '2px'}} className='search-btn pill-btn' onClick={onAdd}>Add your product!</button>
	    </div>
	</>
    );
};

export default ProductsMenu;
