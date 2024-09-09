import {configureStore} from "@reduxjs/toolkit";
import {postConstructorReducer} from "@widgets/post-constructor";

export const store = configureStore({
	reducer: {
		[postConstructorReducer.name]: postConstructorReducer
	},
	middleware: (gDM) => gDM(),
	devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;