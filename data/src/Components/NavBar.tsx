import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { Preferences, PreferencesContext } from '../Functionallity/Preferences';
import { Language, LanguageContext } from '../Functionallity/Language';
import { OptionsInterface, Panel } from '../Functionallity/interfaces';
import { Dispatch, DispatchContext } from '../Functionallity/Dispatch';
import { Icon, Options } from './Mini';
import { Text } from './Mini';

import ARROW_NARROW_LEFT_DASHED from './icons/ARROW_NARROW_LEFT_DASHED';
import DOT_MENU from './icons/DOT_MENU';
import SEARCH from './icons/SEARCH';

interface NavBarButtonProps {
	children: React.ReactNode;
	highlighted: boolean;
}
export const NavBarButton: React.FC<NavBarButtonProps> = ({ children, highlighted }) => {
	const [hover, setHover] = useState<boolean>(false);

	const pre: Preferences = useContext(PreferencesContext);
	return (
		<div
			onMouseOver={() => setHover(true)}
			onMouseLeave={() => setHover(false)}
			style={{
				color: highlighted ? pre.textMainColor : pre.textDimmedColor,
				backgroundColor: hover ? pre.hoverColor : '',
			}}
			className="cursor-pointer px-6 py-2 rounded-full text-sm"
		>
			<Text style={{ borderColor: pre.textMainColor }} className={highlighted ? 'border-b-2' : ''}>
				{children}
			</Text>
		</div>
	);
};
interface NavBarProps {
	panel: Panel;
}
export const NavBar: React.FC<NavBarProps> = ({ panel }) => {
	const pre: Preferences = useContext(PreferencesContext);
	const lang: Language = useContext(LanguageContext);
	return (
		<div style={{ backgroundColor: pre.bgMainColor }} className="py-2 flex justify-center items-center gap-3 text-lg fixed left-0 right-0 bottom-0 z-5">
			<Link to="/hizb">
				<NavBarButton highlighted={panel === Panel.Hizb}>{lang.Type2}</NavBarButton>
			</Link>
			<Link to="/surah">
				<NavBarButton highlighted={panel === Panel.Surah}>{lang.Type1}</NavBarButton>
			</Link>
			<Link to="/counter">
				<NavBarButton highlighted={panel === Panel.Counter}>{lang.Type3}</NavBarButton>
			</Link>
		</div>
	);
};

export const MainNav: React.FC<unknown> = () => {
	const pre: Preferences = useContext(PreferencesContext);
	const dispatch: Dispatch = useContext(DispatchContext);
	const lang: Language = useContext(LanguageContext);
	const navigate = useNavigate();

	const opts: OptionsInterface[] = [];
	const info: () => void = () => navigate('/Info');
	const settings: () => void = () => navigate('/Settings');
	const bookmarks: () => void = () => navigate('/Bookmarks');
	const clearRecent: () => void = () => dispatch.userDispatch({ type: 'ClearRecent' });
	opts.push(new OptionsInterface(lang.Settings, settings, false));
	opts.push(new OptionsInterface(lang.Bookmarks, bookmarks, false));
	opts.push(new OptionsInterface(lang.ClearRecent, clearRecent, false));
	opts.push(new OptionsInterface(lang.Info, info, false));

	return (
		<>
			<pre dir="rtl" className="text-center text-5xl py-36" style={{ fontFamily: 'UrduTypeSetting', color: pre.AccentColor }}>
				القرآن
			</pre>
			<div className="px-4 pb-2 flex justify-between">
				<Link to="/search">
					<Icon>
						<SEARCH />
					</Icon>
				</Link>
				<Options options={opts}>
					<Icon>
						<DOT_MENU />
					</Icon>
				</Options>
			</div>
		</>
	);
};

interface NavTitleProps {
	children: React.ReactNode;
}
export const NavTitle: React.FC<NavTitleProps> = ({ children }) => {
	const pre: Preferences = useContext(PreferencesContext);
	const lang: Language = useContext(LanguageContext);
	return (
		<>
			{lang.dir === 'rtl' ? (
				<pre dir="rtl" style={{ color: pre.AccentColor, fontFamily: 'UrduTypeSetting' }} className="text-center text-5xl py-36">
					{children}
				</pre>
			) : (
				<div style={{ color: pre.AccentColor }} className="text-center text-5xl py-36">
					{children}
				</div>
			)}
		</>
	);
};

interface MiniNavProps {
	children: React.ReactNode;
	opts?: OptionsInterface[];
}
export const MiniNav: React.FC<MiniNavProps> = ({ children, opts }) => {
	const pre: Preferences = useContext(PreferencesContext);
	const navigate = useNavigate();

	function Return(): void {
		navigate(-1);
	}

	return (
		<>
			<pre dir="rtl" style={{ color: pre.AccentColor, fontFamily: 'UrduTypeSetting' }} className="text-center text-5xl py-36">
				{children}
			</pre>
			<div className="px-4 pb-2 flex justify-between">
				<Icon onClick={Return}>
					<ARROW_NARROW_LEFT_DASHED />
				</Icon>
				{opts ? (
					<Options options={opts}>
						<Icon>
							<DOT_MENU />
						</Icon>
					</Options>
				) : (
					true
				)}
			</div>
		</>
	);
};
