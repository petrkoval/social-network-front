import {useSelector} from "react-redux";
import {selectEditorValue, selectIndentSize, selectIndentType} from "@widgets/post-constructor";

export function useHandleTabPress(
	textArea: HTMLTextAreaElement | undefined,
	setEditorValue: (value: string) => void
) {
	const indentSize = useSelector(selectIndentSize);
	const indentType = useSelector(selectIndentType);
	const editorValue = useSelector(selectEditorValue);

	return function () {
		if (textArea) {
			const cursorPosition = textArea.selectionStart;

			switch (indentType) {
				case "space":
					insertSpaceIndentsIntoTextArea(cursorPosition);
					preserveCursorPosition(textArea, cursorPosition, indentSize);
					break;
				case "tab":
					insertTabIndentsIntoTextArea(cursorPosition);
					preserveCursorPosition(textArea, cursorPosition, 1);
					break;
			}
		}
	}

	function insertSpaceIndentsIntoTextArea(cursorPosition: number) {
		const newEditorValue = editorValue.slice(0, cursorPosition) + " ".repeat(indentSize) + editorValue.slice(cursorPosition);
		setEditorValue(newEditorValue);
	}

	function insertTabIndentsIntoTextArea(cursorPosition: number) {
		const newEditorValue = editorValue.slice(0, cursorPosition) + "\t" + editorValue.slice(cursorPosition);
		setEditorValue(newEditorValue);
	}

	function preserveCursorPosition(textArea: HTMLTextAreaElement, cursorPosition: number, indentSize: number) {
		setTimeout(() => textArea.selectionStart = textArea.selectionEnd = cursorPosition + indentSize);
	}
}