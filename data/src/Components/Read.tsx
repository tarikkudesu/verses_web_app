import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Extremes, HizbInterface, isAya, isSurahName, isTumun, OptionsInterface, ReadMode, splitBySpace, SurahInterface, VERSES_API } from '../Functionallity/interfaces';
import { Aya, Break, RenderError, Section, Spinner, SurahName, Tumun } from './Mini';

import { Preferences, PreferencesContext } from '../Functionallity/Preferences';
import { Language, LanguageContext } from '../Functionallity/Language';
import { Dispatch, DispatchContext } from '../Functionallity/Dispatch';
import { MiniNav } from './NavBar';
import { Frame } from './Frames';

import _ from 'lodash';

interface FullProps {
	data: string;
}
const Full: React.FC<FullProps> = ({ data }) => {
	return (
		<div dir="rtl" className="text-center">
			{_.split(data, '\n').map((ele, ind) => {
				if (isSurahName(ele)) return <SurahName surah={ele} key={ind} />;
				else if (isTumun(ele)) return <Tumun tumun={ele} key={ind} />;
				return splitBySpace(ele).map((aya, index) => {
					return <Aya key={index} aya={aya} />;
				});
			})}
		</div>
	);
};
interface FragementProps {
	data: string;
}
const Fragement: React.FC<FragementProps> = ({ data }) => {
	let last: string[][] = [];
	{
		_.split(data, '\n').map((ele) => {
			if (isSurahName(ele)) last.push([ele]);
			else if (isTumun(ele)) last.push([ele]);
			else {
				const fragements: string[][] = [];
				_.split(ele, 'ۖ').map((fragement, index) => {
					let tmp: string[] = _.compact(_.split(fragement, ' '));
					if (tmp[0] && _.startsWith(tmp[0], '﴿') && _.endsWith(tmp[0], '﴾')) {
						fragements[index - 1].push(tmp[0]);
						tmp = tmp.slice(1);
					}
					fragements.push(_.compact(tmp));
				});
				last = _.concat(last, fragements);
			}
		});
	}
	return (
		<div dir="rtl" className="text-center">
			{last.map((fragment, index) => {
				let add: boolean = false;
				return (
					<div dir="rtl" key={index}>
						{fragment.map((ele, ind) => {
							add = true;
							if (isSurahName(ele)) return <SurahName surah={ele} key={ind} />;
							else if (isTumun(ele)) return <Tumun tumun={ele} key={ind} />;
							else if (isAya(ele)) return <Aya key={ind} aya={ele} />;
						})}
						{add ? <Break /> : ''}
					</div>
				);
			})}
		</div>
	);
};

interface ReadsProps {
	mode: 'surah' | 'hizb';
}

const Read: React.FC<ReadsProps> = ({ mode }) => {
	const [error, setError] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(true);
	const [extremes, setExtremes] = useState<Extremes>({ min: 1, max: 1 });
	const [surah, setSurah] = useState<SurahInterface | HizbInterface | undefined>(undefined);
	const pre: Preferences = useContext(PreferencesContext);
	const dispatch: Dispatch = useContext(DispatchContext);
	const lang: Language = useContext(LanguageContext);
	const [verses, setVerses] = useState<string>('');
	const navigate = useNavigate();
	const { index } = useParams();

	useEffect(
		function () {
			async function fetchData() {
				try {
					const response = await fetch(VERSES_API + mode + '/Index.json');
					const json = await response.json();
					const pos = _.findIndex(json, function (o: SurahInterface): boolean {
						return o.index === Number(index);
					});
					if (pos !== -1) {
						setSurah(json[pos]);
						setExtremes({
							min: json[0].index,
							max: json[json.length - 1].index,
						});
					} else setError(true);
				} catch (err) {
					console.error(err);
					setError(true);
				}
			}
			async function getVerses() {
				try {
					const res = await fetch(VERSES_API + mode + `/${index}`);
					const text = await res.text();
					setVerses(text);
				} catch (err) {
					console.error(err);
					setError(true);
				}
			}
			fetchData();
			getVerses();
			setLoading(false);
			return function () {
				setLoading(true);
			};
		},
		[index, mode],
	);
	useEffect(
		function () {
			if (surah) {
				dispatch.userDispatch({
					type: 'Recent' + _.capitalize(mode),
					surah: surah as SurahInterface,
					hizb: surah as HizbInterface,
				});
			}
		},
		[mode, surah],
	);

	const opts: OptionsInterface[] = [];
	const settings: () => void = () => navigate('/settings');
	const bookmarks: () => void = () => navigate('/bookmarks');
	const prev: () => void = () => navigate(`/read${mode}/${Number(index) - 1}`);
	const next: () => void = () => navigate(`/read${mode}/${Number(index) + 1}`);
	if (extremes.max !== Number(index)) opts.push(new OptionsInterface(lang.ReadingNext, next, false));
	if (extremes.min !== Number(index)) opts.push(new OptionsInterface(lang.Readingprev, prev, false));
	opts.push(new OptionsInterface(lang.Bookmarks, bookmarks, false));
	opts.push(new OptionsInterface(lang.Settings, settings, false));

	if (error)
		return (
			<Frame>
				<RenderError />
			</Frame>
		);
	if (loading)
		return (
			<Frame>
				<Spinner />
			</Frame>
		);
	return (
		<Frame>
			<div>
				<MiniNav opts={opts}>{surah?.name}</MiniNav>
				<Section>{pre.readMode === ReadMode.Continous ? <Full data={verses} /> : <Fragement data={verses} />}</Section>
			</div>
		</Frame>
	);
};

export default Read;
