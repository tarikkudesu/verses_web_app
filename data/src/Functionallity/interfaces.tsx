import _ from 'lodash';

export enum Panel {
	Surah = 1,
	Hizb = 2,
	Recent = 3,
	Bookmarks = 4,
	Settings = 5,
	Counter = 6,
}
export const enum Theme {
	Dark = 1,
	Light = 2,
	Night = 3,
}
export const enum ReadMode {
	Continous = 1,
	Splited = 2,
}
export interface SurahInterface {
	name: string;
	index: number;
	ayat: number;
}
export interface HizbInterface {
	name: string;
	index: number;
}
export interface Extremes {
	min: number;
	max: number;
}
export class OptionsInterface {
	label: string;
	checked: boolean;
	event: () => void;
	constructor(label: string, event: () => void, checked: boolean) {
		this.label = label;
		this.event = event;
		this.checked = checked;
	}
}

export function splitBySpace(toSplit: string): string[] {
	if (_.startsWith(toSplit, '-') && _.endsWith(toSplit, '-')) return [toSplit];
	else if (_.startsWith(toSplit, '*') && _.endsWith(toSplit, '*')) return [toSplit];
	return _.split(toSplit, ' ');
}

export function isAya(aya: string): boolean {
	if (!aya) return false;
	else if (_.startsWith(aya, '-') && _.endsWith(aya, '-')) return false;
	else if (_.startsWith(aya, '*') && _.endsWith(aya, '*')) return false;
	return true;
}
export function isTumun(tumun: string): boolean {
	if (_.startsWith(tumun, '*') && _.endsWith(tumun, '*')) return true;
	return false;
}
export function isSurahName(name: string): boolean {
	if (_.startsWith(name, '-') && _.endsWith(name, '-')) return true;
	return false;
}

export const VERSES_API: string = '/quran/';
