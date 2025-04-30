import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { useEffect, useReducer } from 'react';
import './App.css';

import { Preferences, PreferencesContext, preReducer, usePreferencesLocalStorageState } from './Functionallity/Preferences';
import { langReducer, Language, LanguageContext, useLanguageLocalStorageState } from './Functionallity/Language';
import { User, UserContext, userReducer, useUserLocalStorageState } from './Functionallity/User';
import { Dispatch, DispatchContext } from './Functionallity/Dispatch';
import { Theme } from './Functionallity/interfaces';

import Bookmarks from './Components/Bookmarks';
import Settings from './Components/Settings';
import Counter from './Components/Counter';
import Verses from './Components/Verses';
import Search from './Components/Search';
import Surah from './Components/Surah';
import Hizb from './Components/Hizb';
import Info from './Components/Info';
import Read from './Components/Read';
import { Frame } from './Components/Frames';

const App: React.FC<unknown> = () => {
	const { preLocalStorage, setPreLocalStorage } = usePreferencesLocalStorageState(new Preferences(Theme.Night));
	const { langLocalStorage, setLangLocalStorage } = useLanguageLocalStorageState(new Language());
	const { userLocalStorage, setUserLocalStorage } = useUserLocalStorageState(new User());
	const [pre, preDispatch] = useReducer(preReducer, preLocalStorage);
	const [lang, langDispatch] = useReducer(langReducer, langLocalStorage);
	const [user, userDispatch] = useReducer(userReducer, userLocalStorage);
	const dispatch = new Dispatch(preDispatch, userDispatch, langDispatch);
	useEffect(
		function () {
			setPreLocalStorage(pre);
		},
		[pre, setPreLocalStorage],
	);
	useEffect(
		function () {
			setUserLocalStorage(user);
		},
		[setUserLocalStorage, user],
	);
	useEffect(
		function () {
			setLangLocalStorage(lang);
		},
		[lang, setLangLocalStorage],
	);
	return (
		<LanguageContext.Provider value={lang}>
			<UserContext.Provider value={user}>
				<PreferencesContext.Provider value={pre}>
					<DispatchContext.Provider value={dispatch}>
						<BrowserRouter>
							<Routes>
								<Route index element={<Navigate to="/surah" />} />
								<Route path="/" element={<Verses />}>
									<Route path="info" element={<Info />} />
									<Route path="hizb" element={<Hizb />} />
									<Route path="surah" element={<Surah />} />
									<Route path="search" element={<Search />} />
									<Route path="counter" element={<Counter />} />
									<Route path="settings" element={<Settings />} />
									<Route path="bookmarks" element={<Bookmarks />} />
									<Route path="readhizb/:index" element={<Read mode="hizb" />} />
									<Route path="readsurah/:index" element={<Read mode="surah" />} />
								</Route>
								<Route
									path="*"
									element={
										<Frame>
											<div className="py-24">
												<div className="p-4 py-1 max-w-160 mx-auto text-center text-4xl font-semibold rounded-lg text-red-500 bg-red-700/10">404</div>
											</div>
										</Frame>
									}
								/>
							</Routes>
						</BrowserRouter>
					</DispatchContext.Provider>
				</PreferencesContext.Provider>
			</UserContext.Provider>
		</LanguageContext.Provider>
	);
};

export default App;
