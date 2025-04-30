import React, { useContext, useState } from 'react';

import { Preferences, PreferencesContext } from '../Functionallity/Preferences';
import { Language, LanguageContext } from '../Functionallity/Language';
import { OptionsInterface } from '../Functionallity/interfaces';

import CHECK from './icons/CHECK';

export const RenderError: React.FC<unknown> = () => {
	return (
		<div className="p-4 py-1 max-w-160 mx-auto text-center text-lg font-semibold rounded-lg text-red-500 bg-red-700/10">Error: This app seems to be temporarly unavailable</div>
	);
};
export const Break: React.FC<unknown> = () => {
	const pre = useContext(PreferencesContext);
	return <div style={{ backgroundColor: pre.borderColor }} className="h-0.5 mx-4 rounded-full opacity-50"></div>;
};

export const Spinner: React.FC<unknown> = () => {
	const pre: Preferences = useContext(PreferencesContext);
	return (
		<div
			style={{
				position: 'absolute',
				top: '50%',
				left: '50%',
				transform: 'translate(-50%, -50%)',
			}}
		>
			<div style={{ animation: 'spin 1s linear infinite' }} className="h-6 w-6 relative">
				<div style={{ backgroundColor: pre.textMainColor }} className="absolute top-0 left-0 h-2 w-2 rounded-full"></div>
				<div style={{ backgroundColor: pre.AccentColor }} className="absolute top-0 right-0 h-2 w-2 rounded-full"></div>
				<div style={{ backgroundColor: pre.textMainColor }} className="absolute bottom-0 left-0 h-2 w-2 rounded-full"></div>
				<div style={{ backgroundColor: pre.textMainColor }} className="absolute bottom-0 right-0 h-2 w-2 rounded-full"></div>
			</div>
		</div>
	);
};

interface OptionSelectorProps {
	option: OptionsInterface;
	children?: React.ReactNode;
}
export const OptionSector: React.FC<OptionSelectorProps> = ({ option, children }) => {
	const pre: Preferences = useContext(PreferencesContext);
	const lang: Language = useContext(LanguageContext);
	const [hovered, setHoverd] = useState<boolean>(false);
	const style: React.CSSProperties = {
		color: option.checked ? pre.AccentColor : pre.textMainColor,
		backgroundColor: hovered ? pre.bgMainColor : '',
	};
	return (
		<div
			style={style}
			onClick={option.event}
			onMouseOver={() => setHoverd(true)}
			onMouseLeave={() => setHoverd(false)}
			className="min-w-50 py-2 px-4 text-lg flex justify-between items-center whitespace-no-wrap"
		>
			{lang.dir === 'rtl' ? <div className="">{option.checked ? <CHECK /> : ''}</div> : true}
			{children}
			{lang.dir === 'rtl' ? true : <div className="">{option.checked ? <CHECK /> : ''}</div>}
		</div>
	);
};
interface OptionsProps {
	options: OptionsInterface[];
	children: React.ReactNode;
	dir?: 'tr' | 'tl' | 'br' | 'bl';
}
export const Options: React.FC<OptionsProps> = ({ options, dir = 'bl', children }) => {
	const [active, setActive] = useState<boolean>(false);
	const pre = useContext(PreferencesContext);

	function toggle(): void {
		if (!active) setActive(true);
		else setActive(false);
	}

	return (
		<div onClick={toggle} className="cursor-pointer relative">
			{children}
			{active ? (
				<>
					<div onClick={toggle} className="fixed top-0 left-0 right-0 bottom-0 cursor-auto z-9"></div>
					<div
						style={{
							backgroundColor: pre.bgDimmedColor,
							border: `1px solid ${pre.borderColor}`,
							animation: 'OptionIn 0.2s forwards',
						}}
						className={`py-1 absolute ${dir[1] === 'l' ? 'right' : 'left'}-0 ${dir[0] === 'b' ? 'top' : 'bottom'}-0 rounded-2xl shadow-2xl z-10 overflow-hidden`}
					>
						{options.map((ele, index) => {
							return (
								<OptionSector key={index} option={ele}>
									<Text>{ele.label}</Text>
								</OptionSector>
							);
						})}
					</div>
				</>
			) : (
				true
			)}
		</div>
	);
};

interface AyaProps {
	aya: string;
	className?: string;
}
export const Aya: React.FC<AyaProps> = ({ aya }) => {
	const pre = useContext(PreferencesContext);
	if (!aya) return;
	return (
		<pre
			dir="rtl"
			className="inline-block"
			style={{
				color: pre.textMainColor,
				fontFamily: pre.font,
				fontSize: `${pre.fontSize}px`,
				margin: `${Math.ceil(pre.lineHeight / 2)}px ${pre.interWords}px ${Math.ceil(pre.lineHeight / 2)}px  ${pre.interWords}px`,
			}}
		>
			{aya}
		</pre>
	);
};

interface SurahNameProps {
	surah: string;
	className?: string;
}
export const SurahName: React.FC<SurahNameProps> = ({ surah }) => {
	const pre = useContext(PreferencesContext);
	const style: React.CSSProperties = {
		color: pre.textMainColor,
		backgroundColor: pre.bgMainColor,
	};
	return (
		<pre dir="rtl" style={style} className="text-xl px-1 m-1 rounded-full">
			{surah.slice(1, -1)}
		</pre>
	);
};
interface TumunProps {
	tumun: string;
	className?: string;
}
export const Tumun: React.FC<TumunProps> = ({ tumun }) => {
	const pre = useContext(PreferencesContext);
	const style: React.CSSProperties = {
		color: pre.AccentColor,
		backgroundColor: pre.bgMainColor,
	};
	return (
		<pre dir="rtl" style={style} className="text-xl px-1 m-1 rounded-full">
			{tumun.slice(1, -1)}
		</pre>
	);
};

interface SectionProps {
	title?: string;
	children: React.ReactNode;
}
export const Section: React.FC<SectionProps> = ({ title, children }) => {
	const pre = useContext(PreferencesContext);
	return (
		<div style={{ animation: 'stepIn 0.2s ease-in' }} className="pb-8">
			{title ? (
				<div style={{ color: pre.AccentColor }} className="px-6 py-2 opacity-100">
					<Text>{title}</Text>
				</div>
			) : (
				''
			)}
			<div style={{ backgroundColor: pre.bgDimmedColor }} className="min-h-10 rounded-2xl relative py-4">
				{children}
			</div>
		</div>
	);
};

interface IconProps {
	children: React.ReactNode;
	onClick?: () => void;
}
export const Icon: React.FC<IconProps> = ({ onClick, children }) => {
	const [active, setActive] = useState<boolean>(false);
	const pre = useContext(PreferencesContext);

	const style: React.CSSProperties = {
		backgroundColor: active ? pre.hoverColor : '',
		color: pre.textMainColor,
	};

	return (
		<div
			onClick={onClick}
			style={style}
			onMouseDown={() => setActive(true)}
			onMouseUp={() => setActive(false)}
			className="h-8 w-8 flex justify-center items-center rounded-full cursor-pointer"
		>
			{children}
		</div>
	);
};

interface MiniLabelProps {
	className?: string;
	children?: React.ReactNode;
}
export const MiniLabel: React.FC<MiniLabelProps> = ({ className, children }) => {
	const pre = useContext(PreferencesContext);
	return (
		<div style={{ color: pre.AccentColor }} className={`font-semibold text-sm ${className}`}>
			<Text>{children}</Text>
		</div>
	);
};

interface TextProps {
	className?: string;
	children?: React.ReactNode;
	style?: React.CSSProperties;
}
export const Text: React.FC<TextProps> = ({ className, children, style }) => {
	const lang = useContext(LanguageContext);
	return (
		<>
			{lang.dir === 'rtl' ? (
				<pre dir={lang.dir} style={style} className={className}>
					{children}
				</pre>
			) : (
				<div style={style} className={className}>
					{children}
				</div>
			)}
		</>
	);
};
