import { useEffect, useState } from 'react';

const CounterItem = ({ counterGenerate }) => {
	const [item, setItem] = useState([]);

	useEffect(() => {
		const newItem = counterGenerate();
		setItem(newItem);
	}, [counterGenerate]);

	return (
		<ul>
			{item.map(item => (
				<li key={item}>{item}</li>
			))}
		</ul>
	);
};

export default CounterItem;
