import { useContext } from 'react';

import { Language, LanguageContext } from '../Functionallity/Language';
import { User, UserContext } from '../Functionallity/User';
import { SelectorFrame } from './Frames';
import { Break, Section } from './Mini';
import { MiniNav } from './NavBar';
import { Text } from './Mini';

const Bookmarks: React.FC<unknown> = () => {
	const lang: Language = useContext(LanguageContext);
	const user: User = useContext(UserContext);

	return (
		<>
			<MiniNav>{lang.Bookmarks}</MiniNav>
			<Section title={lang.Type1}>
				{user.surahBookmarks.length === 0 ? (
					<div className="text-center">
						<Text className="pb-2">{lang.BookmarksNoBookmarks}</Text>
						<Text className="opacity-50">{lang.BookmarksNoBookmarksExtra1}</Text>
					</div>
				) : (
					user.surahBookmarks.map((ele, index) => {
						return (
							<div key={index}>
								<SelectorFrame mode="surah" data={ele}></SelectorFrame>
								{index + 1 !== user.surahBookmarks.length ? <Break /> : ''}
							</div>
						);
					})
				)}
			</Section>
			<Section title={lang.Type2}>
				{user.hizbBookmarks.length === 0 ? (
					<div className="text-center">
						<Text className="pb-2">{lang.BookmarksNoBookmarks}</Text>
						<Text className="opacity-50">{lang.BookmarksNoBookmarksExtra1}</Text>
					</div>
				) : (
					user.hizbBookmarks.map((ele, index) => {
						return (
							<div key={index}>
								<SelectorFrame mode="hizb" data={ele} />
								{index + 1 !== user.hizbBookmarks.length ? <Break /> : ''}
							</div>
						);
					})
				)}
			</Section>
		</>
	);
};

export default Bookmarks;
