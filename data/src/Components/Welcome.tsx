import React, { useContext, useState } from 'react';

import { PreferencesContext } from '../Functionallity/Preferences';
import { NavTitle } from './NavBar';
import { Section } from './Mini';

interface WelcomeButtonProps {
	children: React.ReactNode;
}
const WelcomeButton: React.FC<WelcomeButtonProps> = ({ children }) => {
	const [hovered, setHoverd] = useState<boolean>(false);
	const pre = useContext(PreferencesContext);

	return (
		<div
			style={{
				color: hovered ? pre.AccentColor : pre.textMainColor,
			}}
			onMouseOver={() => setHoverd(true)}
			onMouseLeave={() => setHoverd(false)}
			className="px-4 py-2 rounded-xl duration-200 cursor-pointer"
		>
			{children}
		</div>
	);
};
interface WelcomeNavProps {
	next?: () => void;
	prev?: () => void;
}
const WelcomeNav: React.FC<WelcomeNavProps> = ({ next, prev }) => {
	return (
		<div className="h-12 flex justify-between items-center px-4">
			<div onClick={prev}>
				<WelcomeButton>Prev</WelcomeButton>
			</div>
			<div onClick={next}>
				<WelcomeButton>Next</WelcomeButton>
			</div>
		</div>
	);
};
const Welcome: React.FC<unknown> = () => {
	return (
		<>
			<NavTitle>مرحبا</NavTitle>
			<Section>
				<div dir="rtl" className="text-2xl text-center" style={{ fontFamily: 'UrduTypeSetting' }}>
					﷽
				</div>
			</Section>
			<WelcomeNav></WelcomeNav>
		</>
	);
};

export default Welcome;
