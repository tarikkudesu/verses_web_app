import { createContext, useEffect, useState } from 'react';
import { HizbInterface, SurahInterface } from './interfaces';

import _ from 'lodash';

export class User {
	public surahBookmarks: SurahInterface[] = [];
	public hizbBookmarks: HizbInterface[] = [];
	public surahRecent: SurahInterface[] = [];
	public hizbRecent: HizbInterface[] = [];
	public notifications: string = '';
	public welcome: boolean = false;
}

interface UserType {
	type: string;
	surah?: SurahInterface;
	hizb?: HizbInterface;
	notification?: string;
}
export function userReducer(state: User, action: UserType): User {
	const newState: User = { ...state };
	// Bookmaks
	function bookmarkHizb(hizb: HizbInterface): void {
		if (
			_.findIndex(newState.hizbBookmarks, function (o: HizbInterface): boolean {
				return o.index === hizb.index;
			}) !== 0
		) {
			newState.hizbBookmarks = [hizb, ...newState.hizbBookmarks];
		}
	}
	function bookmarkSurah(surah: SurahInterface): void {
		if (
			_.findIndex(newState.surahBookmarks, function (o: SurahInterface): boolean {
				return o.index === surah.index;
			}) !== 0
		) {
			newState.surahBookmarks = [surah, ...newState.surahBookmarks];
		}
	}
	function unbookmarkSurah(surah: SurahInterface): void {
		_.remove(newState.surahBookmarks, function (o: SurahInterface): boolean {
			return o.index === surah.index;
		});
	}
	function unbookmarkHizb(hizb: HizbInterface): void {
		_.remove(newState.hizbBookmarks, function (o: HizbInterface): boolean {
			return o.index === hizb.index;
		});
	}

	// Recent
	function recentSurah(surah: SurahInterface): void {
		if (
			_.findIndex(newState.surahRecent, function (o: SurahInterface): boolean {
				return o.index === surah.index;
			}) !== 0
		) {
			newState.surahRecent = [surah, ...newState.surahRecent];
		}
		if (newState.surahRecent.length === 5) newState.surahRecent = newState.surahRecent.slice(0, -1);
	}
	function recentHizb(hizb: HizbInterface): void {
		if (
			_.findIndex(newState.hizbRecent, function (o: HizbInterface): boolean {
				return o.index === hizb.index;
			}) !== 0
		) {
			newState.hizbRecent = [hizb, ...newState.hizbRecent];
		}
		if (newState.hizbRecent.length === 5) newState.hizbRecent = newState.hizbRecent.slice(0, -1);
	}
	function clearRecent(): void {
		newState.surahRecent = [];
		newState.hizbRecent = [];
	}
	function notification(description: string): void {
		newState.notifications = description;
	}
	function clearNotifications(): void {
		newState.notifications = '';
	}

	switch (action.type) {
		case 'Notification':
			if (action.notification) notification(action.notification);
			break;
		case 'ClearNotifications':
			clearNotifications();
			break;
		case 'BookmarkSurah':
			if (action.surah) bookmarkSurah(action.surah);
			break;
		case 'unBookmarkSurah':
			if (action.surah) unbookmarkSurah(action.surah);
			break;
		case 'BookmarkHizb':
			if (action.hizb) bookmarkHizb(action.hizb);
			break;
		case 'unBookmarkHizb':
			if (action.hizb) unbookmarkHizb(action.hizb);
			break;
		case 'RecentSurah':
			if (action.surah) recentSurah(action.surah);
			break;
		case 'RecentHizb':
			if (action.hizb) recentHizb(action.hizb);
			break;
		case 'ClearRecent':
			clearRecent();
			break;
	}
	return newState;
}

export function useUserLocalStorageState(initialState: User) {
	const [userLocalStorage, setUserLocalStorage] = useState(function () {
		const storedValue = localStorage.getItem('User');
		return storedValue ? JSON.parse(storedValue) : initialState;
	});
	useEffect(
		function () {
			localStorage.setItem('User', JSON.stringify(userLocalStorage));
		},
		[userLocalStorage]
	);
	return { userLocalStorage, setUserLocalStorage };
}

export const UserContext = createContext(new User());
