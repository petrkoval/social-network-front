import {useSelector} from "react-redux";
import {selectIndentSize, selectIndentType, Selection, useDispatchChanges} from "@widgets/post-constructor";

export function useHandleInsertTabulation(textArea: HTMLTextAreaElement | undefined) {
	const indentSize = useSelector(selectIndentSize);
	const indentType = useSelector(selectIndentType);
	const [editorValue, setEditorValue] = useDispatchChanges();

	return function () {
		if (textArea) {
			const selection: Selection = {
				start: textArea.selectionStart,
				end: textArea.selectionEnd,
				direction: textArea.selectionDirection
			};

			switch (indentType) {
				case "space":
					insertIndentsIntoTextArea(textArea, selection, " ".repeat(indentSize));
					break;
				case "tab":
					insertIndentsIntoTextArea(textArea, selection, "\t");
					break;
			}
		}
	}

	function insertIndentsIntoTextArea(textArea: HTMLTextAreaElement, selection: Selection, indent: string) {
		if (isMultiLinesSelected(selection)) {
			const firstSelectedLineStartIndex = editorValue.lastIndexOf("\n", selection.start);

			const selectionStart = firstSelectedLineStartIndex > -1 ? firstSelectedLineStartIndex : 0;
			const selectedText = editorValue.slice(selectionStart, selection.end);
			const selectedLines = (selectedText.match(/\n/g) || []).length + 1;

			const textBeforeSelection = editorValue.slice(0, selectionStart);
			const textAfterSelection = editorValue.slice(selection.end);
			const newSelectedValue = indent + editorValue.slice(selectionStart, selection.end).replace(/\n/g, `\n${indent}`);
			setEditorValue(textBeforeSelection + newSelectedValue + textAfterSelection);

			const newSelectionStart = selection.start + indent.length;
			const newSelectionEnd = selection.end + indent.length * selectedLines;
			preserveSelection(textArea, newSelectionStart, newSelectionEnd);
		} else {
			const newEditorValue = editorValue.slice(0, selection.start) + indent + editorValue.slice(selection.end);
			setEditorValue(newEditorValue);

			const newSelection = selection.start + indent.length;
			preserveSelection(textArea, newSelection);
		}
	}

	function preserveSelection(textArea: HTMLTextAreaElement, start: number, end?: number) {
		setTimeout(() => {
			textArea.selectionStart = start;
			textArea.selectionEnd = end ? end : start;
		});
	}

	function isMultiLinesSelected(selection: Selection) {
		return editorValue.slice(selection.start, selection.end).indexOf("\n") > -1;
	}
}