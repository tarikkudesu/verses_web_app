import React, { useContext, useState } from 'react';

import { Preferences, PreferencesContext } from '../Functionallity/Preferences';
import { Language, LanguageContext } from '../Functionallity/Language';
import { Link } from 'react-router-dom';
import { MiniNav } from './NavBar';
import { Section } from './Mini';
import { Text } from './Mini';

interface ContactProps {
	children: React.ReactNode;
}
const Contact: React.FC<ContactProps> = ({ children }) => {
	const pre: Preferences = useContext(PreferencesContext);
	const [hover, setHover] = useState<boolean>(false);
	return (
		<Link to="">
			<div
				onMouseOver={() => setHover(true)}
				onMouseLeave={() => setHover(false)}
				style={{
					color: hover ? pre.AccentColor : pre.textMainColor,
					backgroundColor: hover ? pre.bgMainColor : '',
					transition: '0.1s',
				}}
				className="py-2 text-center font-mono"
			>
				{children}
			</div>
		</Link>
	);
};
const Info: React.FC<unknown> = () => {
	const pre: Preferences = useContext(PreferencesContext);
	const lang: Language = useContext(LanguageContext);
	return (
		<>
			<MiniNav>
				<div className="flex justify-center">
					<img src="app.png" className="w-46 h-46" draggable="false" />
				</div>
				<Text className="text-sm" style={{ color: pre.textDimmedColor }}>
					{lang.AppVersion}
				</Text>
			</MiniNav>
			<Section title={lang.InfoGeneral}>
				<div className="mx-6 my-4">
					This Application is accessible from both Mobile and Desktop. But it was primarly designed for mobile devices, Feel free
					to use it however you please.
				</div>
				<div className="mx-6 my-4">
					If hoverever something goes wrong with the app, Feel free to contact us immediatly. It will be resolved as soon as
					possible.
				</div>
			</Section>
			<Section title={lang.InfoContact}>
				<Contact>Email: amehritarik@gmail.com</Contact>
				<Contact>Phone: +212 624 651 076</Contact>
				<Contact>Website</Contact>
				<Contact>Instagram</Contact>
				<Contact>Github</Contact>
				<Contact>X</Contact>
			</Section>
		</>
	);
};

export default Info;
