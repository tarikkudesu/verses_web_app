import React, { useContext, useState } from 'react';

import { Preferences, PreferencesContext } from '../Functionallity/Preferences';
import { OptionsInterface } from '../Functionallity/interfaces';

interface NotificationProps {
	option?: OptionsInterface;
	description: string;
}
const Notification: React.FC<NotificationProps> = ({ description, option }) => {
	const pre: Preferences = useContext(PreferencesContext);
	const [hover, setHover] = useState<boolean>(false);

	const style: React.CSSProperties = {
		backgroundColor: pre.AccentColor,
		opacity: hover ? '0.8' : '1',
	};
	return (
		<div
			style={{
				backgroundColor: pre.bgDimmedColor,
				border: '1px solid ' + pre.borderColor,
				color: pre.textMainColor,
				animation: 'stepIn 0.2s ease-in',
			}}
			className="w-80 py-4 px-6 rounded-xl fixed bottom-24 right-12 shadow-xl"
		>
			{description}
			{option ? (
				<div className="flex justify-end">
					<div
						onClick={option.event}
						style={style}
						onMouseOver={() => setHover(true)}
						onMouseLeave={() => setHover(false)}
						className="py-1 px-4 mt-2 text-md rounded-lg font-bold cursor-pointer text-white"
					>
						{option.label}
					</div>
				</div>
			) : (
				''
			)}
		</div>
	);
};

export default Notification;
