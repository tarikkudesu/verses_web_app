import { createContext } from 'react';

/* eslint-disable @typescript-eslint/no-explicit-any */
export class Dispatch {
	constructor(preDispatch?: any, userDispatch?: any, langDispatch?: any) {
		this.preDispatch = preDispatch;
		this.userDispatch = userDispatch;
		this.langDispatch = langDispatch;
	}
	preDispatch: any;
	userDispatch: any;
	langDispatch: any;
}

export const DispatchContext = createContext(new Dispatch());
