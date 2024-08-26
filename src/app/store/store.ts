import {configureStore} from "@reduxjs/toolkit";

export const store = configureStore({
	reducer: {},
	middleware: (gDM) => gDM(),
	devTools: process.env.NODE_ENV !== 'production'
});