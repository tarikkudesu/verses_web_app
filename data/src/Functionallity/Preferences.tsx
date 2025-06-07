import { createContext, useEffect, useState } from 'react';
import { ReadMode, Theme } from './interfaces';

export class Preferences {
	public AccentColor: string = '';
	public bgMainColor: string = '';
	public bgDimmedColor: string = '';
	public textMainColor: string = '';
	public textDimmedColor: string = '';
	public borderColor: string = '';
	public hoverColor: string = '';
	public activeColor: string = '';
	constructor(theme: Theme) {
		this.theme = theme;
		if (theme === Theme.Light) {
			this.AccentColor = 'rgb(230, 0, 118)';
			this.bgMainColor = 'rgb(234, 234, 237)';
			this.bgDimmedColor = 'rgb(255, 255, 255)';
			this.textMainColor = 'rgb(0, 0, 0)';
			this.textDimmedColor = 'rgb(113, 113, 123)';
			this.borderColor = 'rgba(159, 159, 169, 0.5)';
			this.hoverColor = 'rgba(159, 159, 169, 0.5)';
			this.activeColor = 'rgba(159, 159, 169, 0.5)';
		} else if (theme === Theme.Dark) {
			this.AccentColor = 'rgb(230, 0, 118)';
			this.bgMainColor = 'rgb(3, 7, 18)';
			this.bgDimmedColor = 'rgb(16, 24, 40)';
			this.textMainColor = 'rgb(255, 255, 255)';
			this.textDimmedColor = 'rgb(113, 113, 123)';
			this.borderColor = 'rgb(30, 41, 57)';
			this.hoverColor = 'rgb(30, 41, 57)';
			this.activeColor = 'rgb(30, 41, 57)';
		} else if (theme === Theme.Night) {
			this.AccentColor = 'rgb(0, 184, 219)';
			this.bgMainColor = 'rgb(16, 24, 40)';
			this.bgDimmedColor = 'rgb(30, 41, 57)';
			this.textMainColor = 'rgb(255, 255, 255)';
			this.textDimmedColor = 'rgb(113, 113, 123)';
			this.borderColor = 'rgb(74, 85, 101)';
			this.hoverColor = 'rgba(74, 85, 101, 0.2)';
			this.activeColor = 'rgb(74, 85, 101)';
		}
	}
	public speed: number = 40;
	public font: string = 'kitab';
	public fontSize: number = 24;
	public lineHeight: number = 28;
	public interWords: number = 12;
	public theme: Theme = Theme.Light;
	public hideOptions: boolean = false;
	public readMode: ReadMode = ReadMode.Splited;
}

interface PreType {
	type: string;
	load?: string;
	size?: number;
	theme?: Theme;
}
export function preReducer(state: Preferences, action: PreType): Preferences {
	let newState: Preferences = { ...state };
	switch (action.type) {
		case 'setContinousMode':
			newState.readMode = ReadMode.Continous;
			break;
		case 'setSplitMode':
			newState.readMode = ReadMode.Splited;
			break;
		case 'setTheme':
			if (action.theme) newState = new Preferences(action.theme);
			break;
		case 'setFontSize':
			if (action.size) newState.fontSize = action.size;
			break;
		case 'setInterWords':
			if (action.size) newState.interWords = action.size;
			break;
		case 'setLineHeight':
			if (action.size) newState.lineHeight = action.size;
			break;
		case 'setFont':
			if (action.load) newState.font = action.load;
			break;
		case 'setSpeed':
			if (action.size) newState.speed = action.size;
			break;
	}
	return newState;
}

export function usePreferencesLocalStorageState(initialState: Preferences) {
	const [preLocalStorage, setPreLocalStorage] = useState(function () {
		const storedValue = localStorage.getItem('Preferences');
		return storedValue ? JSON.parse(storedValue) : initialState;
	});
	useEffect(
		function () {
			localStorage.setItem('Preferences', JSON.stringify(preLocalStorage));
		},
		[preLocalStorage],
	);
	return { preLocalStorage, setPreLocalStorage };
}

export const PreferencesContext = createContext(new Preferences(Theme.Light));
