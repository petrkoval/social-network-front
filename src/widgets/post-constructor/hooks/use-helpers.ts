import {Selection, useDispatchChanges} from "@widgets/post-constructor";

interface ReturnType {
	getIndexesOfSelectedLines(selection: Selection): [number, number];

	divideEditorValue(startIndex: number, endIndex: number): [string, string, string];
}

export function useHelpers(): ReturnType {
	const [editorValue] = useDispatchChanges();

	function getIndexesOfSelectedLines(selection: Selection): [number, number] {
		const startIndex = editorValue.lastIndexOf("\n", selection.start - 1) + 1;
		let endIndex = editorValue.indexOf("\n", selection.end);
		endIndex = endIndex === -1 ? editorValue.length : endIndex;

		return [startIndex, endIndex];
	}

	function divideEditorValue(startIndex: number, endIndex: number): [string, string, string] {
		const beforeValue = editorValue.slice(0, startIndex);
		const selectedValue = editorValue.slice(startIndex, endIndex);
		const afterValue = editorValue.slice(endIndex);

		return [beforeValue, selectedValue, afterValue];
	}

	return {
		getIndexesOfSelectedLines,
		divideEditorValue,
	};
}