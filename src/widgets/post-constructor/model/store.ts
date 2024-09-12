import {HighlightThemes, PostConstructorOptions, PostConstructorState} from "@widgets/post-constructor";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "@app/store";

const initialState: PostConstructorState = {
	editorValue: "",
	viewValue: "",
	linesCount: 1,
	options: {
		autoRenderTime: 0,
		highlightTheme: "codium" as HighlightThemes,
		indentSize: 4,
		indentType: "tab"
	}
}

export const postConstructorSlice = createSlice({
	name: "postConstructor",
	initialState,
	reducers: {
		changeEditorValue: (state, action: PayloadAction<string>) => {
			state.editorValue = action.payload;
		},
		changeViewValue: (state, action: PayloadAction<string>) => {
			state.viewValue = action.payload;
		},
		changeLinesCount: (state, action: PayloadAction<number>) => {
			state.linesCount = action.payload;
		},
		setOptions: (state, action: PayloadAction<PostConstructorOptions>) => {
			state.options = action.payload;
		}
	}
});

export const selectEditorValue = (state: RootState) => state.postConstructor.editorValue;
export const selectViewValue = (state: RootState) => state.postConstructor.viewValue;
export const selectLinesCount = (state: RootState) => state.postConstructor.linesCount;
export const selectAutoRenderTime = (state: RootState) => state.postConstructor.options.autoRenderTime;
export const selectHighlightTheme = (state: RootState) => state.postConstructor.options.highlightTheme;
export const selectIndentSize = (state: RootState) => state.postConstructor.options.indentSize;
export const selectIndentType = (state: RootState) => state.postConstructor.options.indentType;

export const {
	changeEditorValue,
	changeViewValue,
	changeLinesCount,
	setOptions
} = postConstructorSlice.actions;

export const postConstructorReducer = postConstructorSlice.reducer;