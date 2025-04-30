import { createContext, useEffect, useState } from 'react';

export class Language {
	Language: string;
	Language1: string;
	Language2: string;
	CurrentLanguage: string;
	dir: string;
	Type1: string;
	Type2: string;
	Type3: string;
	Info: string;
	InfoGeneral: string;
	InfoContact: string;
	Recent: string;
	ClearRecent: string;
	Bookmarks: string;
	BookmarksNoBookmarks: string;
	BookmarksNoBookmarksExtra1: string;
	BookmarksNoBookmarksExtra2: string;
	Search: string;
	SearchNoSearch: string;
	SearchNoResult: string;
	Settings: string;
	SettingsGenral: string;
	SettingsLanguage: string;
	SettingsTheme: string;
	Theme1: string;
	Theme2: string;
	Theme3: string;
	SettingsReadingMode: string;
	SettingsReadingMode1: string;
	SettingsReadingMode2: string;
	SettingsTypography: string;
	SettingsTypographyFont: string;
	SettingsTypographyFontSize: string;
	SettingsTypographyLineHeight: string;
	SettingsTypographyinterWords: string;
	ReadingNext: string;
	Readingprev: string;
	ReadingHideControllers: string;
	ReadingShowControllers: string;
	CounterReset: string;
	AppVersion: string;
	constructor(curr?: string) {
		if (curr === 'En') {
			this.Language = curr;
			this.Language1 = 'Arabic';
			this.Language2 = 'English';
			this.CurrentLanguage = 'English';
			this.dir = 'ltr';
			this.Type1 = 'Surah';
			this.Type2 = 'Hizb';
			this.Type3 = 'Tasbih';
			this.Info = 'info';
			this.InfoGeneral = 'General Information';
			this.InfoContact = 'Contact Us';
			this.Recent = 'Recent';
			this.ClearRecent = 'Clear Recent';
			this.Bookmarks = 'Bookmarks';
			this.BookmarksNoBookmarks = 'No Bookmarks';
			this.BookmarksNoBookmarksExtra1 = 'Tap the hearth icon on you favourite surah so you can find them here fast';
			this.BookmarksNoBookmarksExtra2 = 'Tap the hearth icon on you favourite hizb so you can find them here fast';
			this.Search = 'Search';
			this.SearchNoSearch = "You havn't searched anything";
			this.SearchNoResult = 'No results were found';
			this.Settings = 'Settings';
			this.SettingsGenral = 'General';
			this.SettingsLanguage = 'Language';
			this.SettingsTheme = 'Theme';
			this.Theme1 = 'Light';
			this.Theme2 = 'Night';
			this.Theme3 = 'Dark';
			this.SettingsReadingMode = 'Reading mode';
			this.SettingsReadingMode1 = 'Continous';
			this.SettingsReadingMode2 = 'Splited';
			this.SettingsTypography = 'Font';
			this.SettingsTypographyFont = 'Font';
			this.SettingsTypographyFontSize = 'Font Size';
			this.SettingsTypographyLineHeight = 'Line Height';
			this.SettingsTypographyinterWords = 'Inter Words';
			this.ReadingNext = 'Next';
			this.Readingprev = 'previous';
			this.ReadingHideControllers = 'Hide Controller';
			this.ReadingShowControllers = 'Show Controller';
			this.CounterReset = 'Reset';
			this.AppVersion = 'Version 1.0.0';
		} else {
			this.Language = 'Ar';
			this.Language1 = 'العربية';
			this.Language2 = 'الإنجليزية';
			this.CurrentLanguage = 'العربية';
			this.dir = 'rtl';
			this.Type1 = 'ســور';
			this.Type2 = 'أحـزاب';
			this.Type3 = 'تسبيـح';
			this.Info = 'حـــول الــتطبيق';
			this.InfoGeneral = 'مــعلومات عــامة';
			this.InfoContact = 'اتـــصل بـــنا';
			this.Recent = 'قائـمة القـراءة الأخيرة';
			this.ClearRecent = 'مـسح قائـمة القـراءة الأخيرة';
			this.Bookmarks = 'المفضلة';
			this.BookmarksNoBookmarks = 'مــا مـن مــفضلة';
			this.BookmarksNoBookmarksExtra1 = 'انقر فوق زر القلب على سورك المفضلة لتتمكن من العثور عليها هنا بسرعة';
			this.BookmarksNoBookmarksExtra2 = 'انقر فوق زر القلب على أحـزابك المفضلة لتتمكن من العثور عليها هنا بسرعة';
			this.Search = 'بحث';
			this.SearchNoSearch = 'لم يتم القيام بعملية البحت';
			this.SearchNoResult = 'لم يتم العثور على أي نتيجة';
			this.Settings = 'الإعدادات';
			this.SettingsGenral = 'عـــام';
			this.SettingsLanguage = 'الـــلغة';
			this.SettingsTheme = 'الـــسمة';
			this.Theme1 = 'ســـاطع';
			this.Theme2 = 'لــيلي';
			this.Theme3 = 'داكــن';
			this.SettingsReadingMode = 'وضــع الــقراءة';
			this.SettingsReadingMode1 = 'مـــتصل';
			this.SettingsReadingMode2 = 'مـــتقطع';
			this.SettingsTypography = 'الـــخط';
			this.SettingsTypographyFont = 'نــمط الـــخط';
			this.SettingsTypographyFontSize = 'حــجم الـــخط';
			this.SettingsTypographyLineHeight = 'ارتفــاع الـــخط';
			this.SettingsTypographyinterWords = 'بــعد الــكلمات';
			this.ReadingNext = 'الــتالي';
			this.Readingprev = 'الــسابق';
			this.ReadingHideControllers = 'إخفــاء زر الــتحكم';
			this.ReadingShowControllers = 'إظهــار زر الــتحكم';
			this.CounterReset = 'دورة';
			this.AppVersion = '1.0.0 إصـــدار';
		}
	}
}

interface LangType {
	type: string;
	load?: string;
}
export function langReducer(state: Language, action: LangType): Language {
	let newState: Language = { ...state };
	switch (action.type) {
		case 'setLanguage':
			if (action.load) newState = new Language(action.load);
			break;
	}
	return newState;
}

interface TempLanguage {
	Language: string;
}
export function useLanguageLocalStorageState(initialState: Language) {
	const [langLocalStorage, setLangLocalStorage] = useState(function () {
		const storedValue = localStorage.getItem('Language');
		if (storedValue) {
			const json: TempLanguage = JSON.parse(storedValue);
			return new Language(json.Language);
		}
		return initialState;
	});
	useEffect(
		function () {
			localStorage.setItem('Language', JSON.stringify({ Language: langLocalStorage.Language } as TempLanguage));
		},
		[langLocalStorage]
	);
	return { langLocalStorage, setLangLocalStorage };
}

export const LanguageContext = createContext(new Language());
