import { useContext, useState } from 'react';

import { Preferences, PreferencesContext } from '../Functionallity/Preferences';
import { Language, LanguageContext } from '../Functionallity/Language';
import { Panel } from '../Functionallity/interfaces';
import { NavBar } from './NavBar';
import { Text } from './Mini';

const Counter: React.FC<unknown> = () => {
	const pre: Preferences = useContext(PreferencesContext);
	const lang: Language = useContext(LanguageContext);
	const [counter, setCounter] = useState<number>(0);

	const click: () => void = () => {
		if (counter < 100) {
			setCounter(counter + 1);
			if ('vibrate' in window.navigator) window.navigator.vibrate([100]);
		}
	};

	return (
		<>
			<NavBar panel={Panel.Counter} />
			<div style={{ backgroundColor: pre.bgMainColor }}>
				<div style={{ color: pre.textMainColor }} className="text-5xl text-center mt-36 font-semibold">
					{counter}
				</div>
				<div
					onClick={click}
					style={{ backgroundColor: pre.AccentColor, animation: 'Bouncer 3s infinite ease-in' }}
					className="h-50 w-50 rounded-full fixed top-3/5 left-1/2 -translate-x-1/2 -translate-y-1/2 border-t-2 border-white/80 flex justify-center items-center cursor-pointer"
				>
					<svg xmlns="http://www.w3.org/2000/svg" width="71.247" height="77.774" viewBox="0 0 71.247 77.774">
						<path
							id="Subtraction_1"
							data-name="Subtraction 1"
							d="M113.228,101.251a14.022,14.022,0,0,1-7-1.875l-21.659-12.5a14,14,0,0,1-7-12.1l-.023-16.523,35.685,20.572.014-.024.014.024,35.5-20.462.023,16.475a14,14,0,0,1-7.017,12.154l-21.553,12.4A14.019,14.019,0,0,1,113.228,101.251Zm.019-29.6h0l-35.711-20.6,0-1.149a14,14,0,0,1,7.017-12.154l21.553-12.4a14,14,0,0,1,13.983.01l21.658,12.5a14,14,0,0,1,7,12.1l0,1.209-35.5,20.478Z"
							transform="translate(-77.534 -23.476)"
							fill="#fff"
						/>
					</svg>
				</div>
				<div className="fixed left-0 right-0 bottom-24 flex justify-center items-center cursor-pointer">
					<div
						onClick={() => setCounter(0)}
						style={{ backgroundColor: pre.borderColor, color: pre.textMainColor }}
						className="w-30 py-3 rounded-full text-center opacity-60"
					>
						<Text>{lang.CounterReset}</Text>
					</div>
				</div>
			</div>
		</>
	);
};

export default Counter;
