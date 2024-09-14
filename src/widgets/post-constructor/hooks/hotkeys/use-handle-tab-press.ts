import {useSelector} from "react-redux";
import {selectIndentSize, selectIndentType, Selection, useDispatchChanges} from "@widgets/post-constructor";

export function useHandleTabPress(textArea: HTMLTextAreaElement | undefined) {
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
			const selectedLinesExceptFirst = (selectedText.match(/\n/g) || []).length;

			const textBeforeSelection = editorValue.slice(0, selectionStart);
			const textAfterSelection = editorValue.slice(selection.end);
			const newSelectedValue = "\t" + editorValue.slice(selectionStart, selection.end).replace(/\n/g, `\n${indent}`);
			setEditorValue(textBeforeSelection + newSelectedValue + textAfterSelection);

			setTimeout(() => {
				textArea.selectionStart = selection.start + indent.length;
				textArea.selectionEnd = selection.end + indent.length * selectedLinesExceptFirst + 1;
				textArea.selectionDirection = selection.direction;
			});
		} else {
			const newEditorValue = editorValue.slice(0, selection.start) + indent + editorValue.slice(selection.end);
			setEditorValue(newEditorValue);

			setTimeout(() => {
				textArea.selectionStart = textArea.selectionEnd = selection.start + indent.length;
			});
		}
	}

	function isMultiLinesSelected(selection: Selection) {
		return editorValue.slice(selection.start, selection.end).indexOf("\n") > -1;
	}
}