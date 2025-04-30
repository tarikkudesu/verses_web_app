import React, { useContext } from 'react';

import { HizbInterface, SurahInterface } from '../Functionallity/interfaces';
import { Language, LanguageContext } from '../Functionallity/Language';
import { User, UserContext } from '../Functionallity/User';
import { SelectorFrame } from './Frames';
import { Break, Section } from './Mini';

interface RecentProps {
	mode: 'surah' | 'hizb';
}
const Recent: React.FC<RecentProps> = ({ mode = 'surah' }) => {
	const user: User = useContext(UserContext);
	const lang: Language = useContext(LanguageContext);
	const data: SurahInterface[] | HizbInterface[] = mode === 'surah' ? user.surahRecent : user.hizbRecent;

	return (
		<>
			{data && data.length === 0 ? (
				''
			) : (
				<Section title={lang.Recent}>
					{data.reverse().map((ele, index) => {
						return (
							<div key={index}>
								<SelectorFrame mode={mode} data={ele} />
								{index + 1 !== data.length ? <Break /> : ''}
							</div>
						);
					})}
				</Section>
			)}
		</>
	);
};

export default Recent;
