import React, { useContext, useState } from 'react';

import { OptionsInterface, ReadMode, Theme } from '../Functionallity/interfaces';
import { Preferences, PreferencesContext } from '../Functionallity/Preferences';
import { LanguageContext } from '../Functionallity/Language';
import { DispatchContext } from '../Functionallity/Dispatch';
import { Break, MiniLabel, Options, Section } from './Mini';
import { SettingFrame } from './Frames';
import { MiniNav } from './NavBar';

const Settings: React.FC<unknown> = () => {
	const lang = useContext(LanguageContext);
	const dispatch = useContext(DispatchContext);
	const pre: Preferences = useContext(PreferencesContext);
	const [fontSize, setFontSize] = useState<number>(pre.fontSize);
	const [lineHeight, setLineHeight] = useState<number>(pre.lineHeight);
	const [interWords, setInterWords] = useState<number>(pre.interWords);

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	function onChangeFS(e: any): void {
		e.preventDefault();
		setFontSize(e.target.value);
		dispatch.preDispatch({ type: 'setFontSize', size: e.target.value });
	}
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	function onChangeLH(e: any): void {
		e.preventDefault();
		setLineHeight(e.target.value);
		dispatch.preDispatch({ type: 'setLineHeight', size: e.target.value });
	}
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	function onChangeIW(e: any): void {
		e.preventDefault();
		setInterWords(e.target.value);
		dispatch.preDispatch({ type: 'setInterWords', size: e.target.value });
	}

	// theme options
	const opts: OptionsInterface[] = [];
	const dark: () => void = () => dispatch.preDispatch({ type: 'setTheme', theme: Theme.Dark });
	const light: () => void = () => dispatch.preDispatch({ type: 'setTheme', theme: Theme.Light });
	const night: () => void = () => dispatch.preDispatch({ type: 'setTheme', theme: Theme.Night });
	opts.push(new OptionsInterface(lang.Theme1, light, pre.theme === Theme.Light));
	opts.push(new OptionsInterface(lang.Theme2, night, pre.theme === Theme.Night));
	opts.push(new OptionsInterface(lang.Theme3, dark, pre.theme === Theme.Dark));

	// font options
	const fontOpts: OptionsInterface[] = [];
	const font1: () => void = () => dispatch.preDispatch({ type: 'setFont', load: 'font-1' });
	const font2: () => void = () => dispatch.preDispatch({ type: 'setFont', load: 'font-2' });
	const font3: () => void = () => dispatch.preDispatch({ type: 'setFont', load: 'font-3' });
	const font4: () => void = () => dispatch.preDispatch({ type: 'setFont', load: 'font-4' });
	const font5: () => void = () => dispatch.preDispatch({ type: 'setFont', load: 'font-5' });
	const font6: () => void = () => dispatch.preDispatch({ type: 'setFont', load: 'font-6' });
	const font7: () => void = () => dispatch.preDispatch({ type: 'setFont', load: 'font-7' });
	const font8: () => void = () => dispatch.preDispatch({ type: 'setFont', load: 'font-8' });
	fontOpts.push(new OptionsInterface(lang.SettingsTypography + ' 1', font1, pre.font === 'font-1'));
	fontOpts.push(new OptionsInterface(lang.SettingsTypography + ' 2', font2, pre.font === 'font-2'));
	fontOpts.push(new OptionsInterface(lang.SettingsTypography + ' 3', font3, pre.font === 'font-3'));
	fontOpts.push(new OptionsInterface(lang.SettingsTypography + ' 4', font4, pre.font === 'font-4'));
	fontOpts.push(new OptionsInterface(lang.SettingsTypography + ' 5', font5, pre.font === 'font-5'));
	fontOpts.push(new OptionsInterface(lang.SettingsTypography + ' 6', font6, pre.font === 'font-6'));
	fontOpts.push(new OptionsInterface(lang.SettingsTypography + ' 7', font7, pre.font === 'font-7'));
	fontOpts.push(new OptionsInterface(lang.SettingsTypography + ' 8', font8, pre.font === 'font-8'));

	// read options
	const ReadOpts: OptionsInterface[] = [];
	const continous: () => void = () => dispatch.preDispatch({ type: 'setContinousMode' });
	const splited: () => void = () => dispatch.preDispatch({ type: 'setSplitMode' });
	ReadOpts.push(new OptionsInterface(lang.SettingsReadingMode1, continous, pre.readMode === ReadMode.Continous));
	ReadOpts.push(new OptionsInterface(lang.SettingsReadingMode2, splited, pre.readMode === ReadMode.Splited));

	// Lang options
	const LangOpts: OptionsInterface[] = [];
	const Arabic: () => void = () => dispatch.langDispatch({ type: 'setLanguage', load: 'Ar' });
	const English: () => void = () => dispatch.langDispatch({ type: 'setLanguage', load: 'En' });
	LangOpts.push(new OptionsInterface(lang.Language1, Arabic, lang.Language === 'Ar'));
	LangOpts.push(new OptionsInterface(lang.Language2, English, lang.Language === 'En'));

	return (
		<>
			<MiniNav>{lang.Settings}</MiniNav>
			<Section title={lang.SettingsGenral}>
				<Options options={LangOpts} dir={lang.dir === 'ltr' ? 'br' : 'bl'}>
					<SettingFrame label={lang.SettingsLanguage}>
						<MiniLabel>{lang.CurrentLanguage}</MiniLabel>
					</SettingFrame>
				</Options>
				<Break />
				<Options options={opts} dir={lang.dir === 'ltr' ? 'br' : 'bl'}>
					<SettingFrame label={lang.SettingsTheme}>
						<MiniLabel>
							{pre.theme === Theme.Light ? lang.Theme1 : pre.theme === Theme.Night ? lang.Theme2 : lang.Theme3}
						</MiniLabel>
					</SettingFrame>
				</Options>
				<Break />
				<Options options={ReadOpts} dir={lang.dir === 'ltr' ? 'br' : 'bl'}>
					<SettingFrame label={lang.SettingsReadingMode}>
						<MiniLabel>{pre.readMode === ReadMode.Continous ? lang.SettingsReadingMode1 : lang.SettingsReadingMode2}</MiniLabel>
					</SettingFrame>
				</Options>
			</Section>
			<Section title={lang.SettingsTypography}>
				<Options options={fontOpts} dir={lang.dir === 'ltr' ? 'br' : 'bl'}>
					<SettingFrame label={lang.SettingsTypographyFont}>
						<MiniLabel className="text-center">{pre.font}</MiniLabel>
						<pre dir="rtl" style={{ fontSize: '24px', fontFamily: `${pre.font}` }} className="text-center my-2">
							بِسْمِ اِ۬للَّهِ اِ۬لرَّحْمَـٰنِ اِ۬لرَّحِيمِ
						</pre>
					</SettingFrame>
				</Options>
				<Break />
				<SettingFrame label={lang.SettingsTypographyFontSize}>
					<MiniLabel className="text-center">{pre.fontSize}</MiniLabel>
					<input onChange={onChangeFS} value={fontSize} type="range" className="w-full" />
					<pre dir="rtl" style={{ fontSize: `${pre.fontSize}px` }} className="text-center my-2">
						بِسْمِ اِ۬للَّهِ اِ۬لرَّحْمَـٰنِ اِ۬لرَّحِيمِ
					</pre>
				</SettingFrame>
				<Break />
				<SettingFrame label={lang.SettingsTypographyinterWords}>
					<MiniLabel className="text-center">{pre.interWords}</MiniLabel>
					<input onChange={onChangeIW} value={interWords} type="range" className="w-full" />
					<div className="flex justify-center">
						<pre dir="rtl" style={{ margin: `0px ${pre.interWords}px`, fontSize: '24px' }} className="text-center my-2 text-lg">
							اِ۬لرَّحِيمِ
						</pre>
						<pre dir="rtl" style={{ margin: `0px ${pre.interWords}px`, fontSize: '24px' }} className="text-center my-2 text-lg">
							اِ۬لرَّحْمَـٰنِ
						</pre>
						<pre dir="rtl" style={{ margin: `0px ${pre.interWords}px`, fontSize: '24px' }} className="text-center my-2 text-lg">
							اِ۬للَّهِ
						</pre>
						<pre dir="rtl" style={{ margin: `0px ${pre.interWords}px`, fontSize: '24px' }} className="text-center my-2 text-lg">
							بِسْمِ
						</pre>
					</div>
				</SettingFrame>
				<Break />
				<SettingFrame label={lang.SettingsTypographyLineHeight}>
					<MiniLabel className="text-center">{pre.lineHeight}</MiniLabel>
					<input onChange={onChangeLH} value={lineHeight} type="range" className="w-full" />
					<pre dir="rtl" style={{ marginBottom: `${pre.lineHeight}px`, fontSize: '24px' }} className="text-center my-2 text-lg">
						بِسْمِ اِ۬للَّهِ اِ۬لرَّحْمَـٰنِ اِ۬لرَّحِيمِ
					</pre>
					<pre dir="rtl" style={{ fontSize: '24px' }} className="text-center my-2">
						بِسْمِ اِ۬للَّهِ اِ۬لرَّحْمَـٰنِ اِ۬لرَّحِيمِ
					</pre>
				</SettingFrame>
			</Section>
		</>
	);
};

export default Settings;
