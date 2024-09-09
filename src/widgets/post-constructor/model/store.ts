import {PostConstructorState} from "@widgets/post-constructor";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "@app/store";

const initialState: PostConstructorState = {
	editorValue: "",
	viewValue: "",
	options: {
		autoRenderTime: 5
	}
}

const postConstructorSlice = createSlice({
	name: "postConstructor",
	initialState,
	reducers: {
		changeEditorValue: (state, action: PayloadAction<string>) => {
			state.editorValue = action.payload;
		},
		changeViewValue: (state, action: PayloadAction<string>) => {
			state.viewValue = action.payload;
		},
		changeAutoRenderTime: (state, action: PayloadAction<number>) => {
			state.options.autoRenderTime = action.payload;
		}
	}
});

export const selectEditorValue = (state: RootState) => state.postConstructor.editorValue;
export const selectViewValue = (state: RootState) => state.postConstructor.viewValue;
export const selectAutoRenderTime = (state: RootState) => state.postConstructor.options.autoRenderTime;

export const {changeEditorValue, changeViewValue, changeAutoRenderTime} = postConstructorSlice.actions;
export const postConstructorReducer = postConstructorSlice.reducer;