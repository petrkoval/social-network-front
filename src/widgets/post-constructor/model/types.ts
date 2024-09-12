export interface PostConstructorState {
	editorValue: string;
	viewValue: string;
	linesCount: number;
	options: PostConstructorOptions;
}

export interface PostConstructorOptions {
	autoRenderTime: number;
	highlightTheme: HighlightThemes;
	indentSize: number;
	indentType: "tab" | "space";
}

export enum HighlightThemes {
	codium = "codium",
	vs2015 = "vs2015",
	atomOneDark = "atomOneDark",
	tokyoNightDark = "tokyoNightDark",
	arta = "arta",
	srcery = "srcery",
	base16_3024 = "base16_3024",
	dracula = "dracula",
	monokai = "monokai",
	base16_edge = "base16_edge",
}