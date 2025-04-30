import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';

import { Preferences, PreferencesContext } from '../Functionallity/Preferences';
import { HizbInterface, SurahInterface } from '../Functionallity/interfaces';
import { Dispatch, DispatchContext } from '../Functionallity/Dispatch';
import { User, UserContext } from '../Functionallity/User';
import { Icon } from './Mini';
import { Text } from './Mini';

import HEART_MINUS from './icons/HEART_MINUS';
import HEART_PLUS from './icons/HEART_PLUS';
import _ from 'lodash';

interface SettingFrameProps {
	children: React.ReactNode;
	label: string;
}
export const SettingFrame: React.FC<SettingFrameProps> = ({ label, children }) => {
	const [hovered, setHoverd] = useState<boolean>(false);
	const pre = useContext(PreferencesContext);

	const style: React.CSSProperties = {
		backgroundColor: hovered ? pre.bgMainColor : '',
	};

	return (
		<div style={style} onMouseOver={() => setHoverd(true)} onMouseLeave={() => setHoverd(false)}>
			<div className="mx-6 py-2">
				<Text className="text-lg">{label}</Text>
				{children}
			</div>
		</div>
	);
};

interface SelectorProps {
	name: string;
	index: number;
	info?: string;
}
export const Selector: React.FC<SelectorProps> = ({ name, index, info }) => {
	const pre = useContext(PreferencesContext);

	return (
		<div className="flex justify-end items-center cursor-pointer">
			<div className="min-h-12 py-1 ml-2 flex-grow">
				<pre style={{ fontFamily: 'kitab' }} dir="rtl" className="text-2xl">
					{name}
				</pre>
				{info ? (
					<pre dir="rtl" style={{ color: pre.textDimmedColor }} className="text-sm">
						{info}
					</pre>
				) : (
					''
				)}
			</div>
			<div style={{ color: pre.textMainColor }} className="h-12 py-1 px-4 rounded-lg text-lg text-center">
				{index}
			</div>
		</div>
	);
};

interface SelectorFrameProps {
	mode: 'surah' | 'hizb';
	data: SurahInterface | HizbInterface;
}
export const SelectorFrame: React.FC<SelectorFrameProps> = ({ mode, data }) => {
	const user: User = useContext(UserContext);
	const dispatch: Dispatch = useContext(DispatchContext);
	const pre: Preferences = useContext(PreferencesContext);
	const [hovered, setHoverd] = useState<boolean>(false);
	const [bookmarked, setBookmarked] = useState<boolean>(
		_.findIndex(user.surahBookmarks, (o: SurahInterface | HizbInterface): boolean => o.name === data.name) !== -1 ||
			_.findIndex(user.hizbBookmarks, (o: SurahInterface | HizbInterface): boolean => o.name === data.name) !== -1,
	);

	const style: React.CSSProperties = {
		backgroundColor: hovered ? pre.bgMainColor : '',
	};

	function bookmark() {
		dispatch.userDispatch({
			type: `${bookmarked ? 'un' : ''}Bookmark` + _.capitalize(mode),
			surah: data as SurahInterface,
			hizb: data as HizbInterface,
		});
		setBookmarked(!bookmarked);
	}

	return (
		<div style={style} onMouseOver={() => setHoverd(true)} onMouseLeave={() => setHoverd(false)} className="flex justify-between items-center px-4">
			<Icon onClick={bookmark}>{bookmarked ? <HEART_MINUS className="w-5 h-5" /> : <HEART_PLUS className="w-5 h-5" />}</Icon>
			<div className="flex-grow">
				<Link to={'/read' + mode + '/' + data.index}>
					<Selector name={data.name} index={data.index} info={'ayat' in data ? 'عدد الآيات ' + data.ayat : ''} />
				</Link>
			</div>
		</div>
	);
};

interface FrameProps {
	className?: string;
	children: React.ReactNode;
}
export const Frame: React.FC<FrameProps> = ({ children }) => {
	const pre = useContext(PreferencesContext);
	return (
		<div style={{ color: pre.textMainColor, backgroundColor: pre.bgMainColor, userSelect: 'none' }} className="pb-6 min-h-screen">
			<div className="max-w-200 mx-auto px-1 md:px-0">{children}</div>
		</div>
	);
};
