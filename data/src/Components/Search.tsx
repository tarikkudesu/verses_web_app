import { useContext, useEffect, useState } from 'react';

import { Preferences, PreferencesContext } from '../Functionallity/Preferences';
import { HizbInterface, SurahInterface } from '../Functionallity/interfaces';
import { Language, LanguageContext } from '../Functionallity/Language';
import { Break, Section, Spinner } from './Mini';
import { SelectorFrame } from './Frames';
import { MiniNav } from './NavBar';
import { Text } from './Mini';

import Recent from './Recent';
import _ from 'lodash';

class Data {
	surah: SurahInterface[];
	hizb: HizbInterface[];
	constructor(surah: SurahInterface[] = [], hizb: HizbInterface[] = []) {
		this.surah = surah;
		this.hizb = hizb;
	}
}
const Search: React.FC<unknown> = () => {
	const [query, setQuery] = useState<string>('');
	const [data, setData] = useState<Data>(new Data());
	const [loading, setLoading] = useState<boolean>(true);
	const [results, setResults] = useState<Data>(new Data());
	const pre: Preferences = useContext(PreferencesContext);
	const lang: Language = useContext(LanguageContext);

	useEffect(function () {
		async function fetchData() {
			try {
				const Sresponse = await fetch('http://localhost:7417/quran/surah/Index.json');
				const Sjson = await Sresponse.json();
				const Hresponse = await fetch('http://localhost:7417/quran/hizb/Index.json');
				const Hjson = await Hresponse.json();
				setData(new Data(Sjson, Hjson));
			} catch (Err) {
				console.log(Err);
			}
			setLoading(false);
		}
		fetchData();
	}, []);

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	function onChange(e: any) {
		setQuery(e.target.value);
		if (e.target.value === '') setResults(new Data([], []));
		else
			setResults(
				new Data(
					_.filter(data.surah, function (o) {
						return _.includes(o.name, e.target.value) || o.index === Number(e.target.value);
					}),
					_.filter(data.hizb, function (o) {
						return _.includes(o.name, e.target.value) || o.index === Number(e.target.value);
					})
				)
			);
	}
	return (
		<>
			<MiniNav>بحث</MiniNav>
			<Section>
				<pre dir={lang.dir}>
					<input
						onChange={onChange}
						value={query}
						type="text"
						placeholder={lang.Search}
						maxLength={15}
						minLength={1}
						style={{ color: pre.textMainColor }}
						className="px-8 w-full rounded-full placeholder:text-gray-500 outline-0"
					/>
				</pre>
			</Section>
			{loading ? (
				<Spinner />
			) : (
				<>
					<Section title={lang.Type1}>
						{results.surah.length === 0 ? (
							<div className="text-center">
								{query ? <Text>{lang.SearchNoResult}</Text> : <Text>{lang.SearchNoSearch}</Text>}
							</div>
						) : (
							results.surah.map((ele, index) => {
								return (
									<div key={index}>
										<SelectorFrame mode="surah" data={ele} />
										{index + 1 !== results.surah.length ? <Break /> : ''}
									</div>
								);
							})
						)}
					</Section>
					<Section title={lang.Type2}>
						{results.hizb.length === 0 ? (
							<div className="text-center">
								{query ? <Text>{lang.SearchNoResult}</Text> : <Text>{lang.SearchNoSearch}</Text>}
							</div>
						) : (
							results.hizb.map((ele, index) => {
								return (
									<div key={index}>
										<SelectorFrame mode="hizb" data={ele} />
										{index + 1 !== results.hizb.length ? <Break /> : ''}
									</div>
								);
							})
						)}
					</Section>
				</>
			)}
			<Recent mode="surah" />
			<Recent mode="hizb" />
		</>
	);
};

export default Search;
