import React, { useContext, useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

import { PreferencesContext } from '../Functionallity/Preferences';
import { DispatchContext } from '../Functionallity/Dispatch';
import { User, UserContext } from '../Functionallity/User';
import { Frame } from './Frames';

import Notification from './Notification';

export const Header: React.FC<unknown> = () => {
	const pre = useContext(PreferencesContext);
	return (
		<div style={{ backgroundColor: pre.bgMainColor }} className="h-20 px-4 flex justify-between items-center">
			<Link to="/">
				<div style={{ color: `${pre.textMainColor}` }} className="font-bold text-xl">
					VERSES Tr.
				</div>
			</Link>
			<div className=""></div>
		</div>
	);
};

const Verses: React.FC<unknown> = () => {
	const [notification, setNotification] = useState<boolean>(false);
	const dispatch = useContext(DispatchContext);
	const user: User = useContext(UserContext);

	useEffect(
		function () {
			if (user.notifications) {
				setNotification(true);
				setTimeout(function () {
					dispatch.userDispatch({ type: 'ClearNotifications' });
					setNotification(false);
				}, 4000);
			}
		},
		[user.notifications]
	);

	return (
		<Frame>
			<Header />
			<Outlet />
			{notification ? <Notification description={user.notifications} /> : ''}
		</Frame>
	);
};

export default Verses;
