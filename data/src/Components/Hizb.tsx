import { useEffect, useState } from 'react';

import { HizbInterface, Panel, VERSES_API } from '../Functionallity/interfaces';
import { Break, Section, Spinner } from './Mini';
import { MainNav, NavBar } from './NavBar';
import { SelectorFrame } from './Frames';

import Recent from './Recent';

const Hizb: React.FC<unknown> = () => {
	const [data, setData] = useState<HizbInterface[]>([]);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(function () {
		async function fetchData() {
			const response = await fetch(VERSES_API + 'hizb/Index.json');
			const json = await response.json();
			setData(json);
			setLoading(false);
		}
		fetchData();
	}, []);
	return (
		<>
			<MainNav />
			<NavBar panel={Panel.Hizb} />
			<Recent mode="hizb" />
			<Section>
				{loading ? (
					<Spinner />
				) : (
					data.map((ele, index) => {
						return (
							<div key={index}>
								<SelectorFrame mode="hizb" data={ele} />
								{index + 1 !== data.length ? <Break /> : ''}
							</div>
						);
					})
				)}
			</Section>
		</>
	);
};

export default Hizb;
