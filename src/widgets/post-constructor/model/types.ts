export interface PostConstructorState {
	editorValue: string;
	viewValue: string;
	options: PostConstructorOptions;
}

interface PostConstructorOptions {
	autoRenderTime: number;
}