export interface PostConstructorState {
	editorValue: string;
	viewValue: string;
	linesCount: number;
	options: PostConstructorOptions;
}

export interface PostConstructorOptions {
	autoRenderTime: number;
	highlightTheme: HighlightThemes;
}

export enum HighlightThemes {
	"vs2015",
	"srcery",
	"tokyoNightDark"
}