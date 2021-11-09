import React, {useState, useMemo, useCallback} from 'react';
import EventsMenu from '../EventsMenu';
import ProductsMenu from '../ProductsMenu';

const topMenuOptions = [
    {name: 'Events', Component: EventsMenu},
    {name: 'Products', Component: ProductsMenu}
];
const TopBar = ({onSearch: onSearchProp, onAdd: onAddProp, data}) => {
    const [topSelected, setTopSelected] = useState(null);
    const selected = k => topSelected === k;
    const selectedOption = useMemo(()=>topSelected!==null?topMenuOptions[topSelected]:null, [topSelected]);
    const SelectedComponent = selectedOption?.Component;
    const onSearch = useCallback((searchData) => {
	onSearchProp(selectedOption.name, searchData);
	setTopSelected(null);
    }, [onSearchProp, selectedOption]);
    const onAdd = () => {
	setTopSelected(null);
	onAddProp();
    };
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
		{data?.userFilter&&(
		    <b className='filter-msg'>Filtering: {data?.shownUsers}/{data?.totalUsers}</b>
		)}
		{topSelected!==null&&
		 <button className='close-btn' onClick={()=>setTopSelected(null)}>X</button>
		}
	    </div>
	    <div className='top-bar-content'>
		{SelectedComponent&&(
		    <SelectedComponent
			onSearch={onSearch}
			onAdd={onAdd}
			data={data}
		    />
		)}
	    </div>
	</div>
    );
};

export default TopBar;
