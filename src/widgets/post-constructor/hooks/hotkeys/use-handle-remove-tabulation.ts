import {useSelector} from "react-redux";
import {selectIndentSize, selectIndentType, Selection, useDispatchChanges} from "@widgets/post-constructor";

export function useHandleRemoveTabulation(textArea: HTMLTextAreaElement | undefined) {
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
					removeIndentsFromTextArea(textArea, selection, " ".repeat(indentSize));
					break;
				case "tab":
					removeIndentsFromTextArea(textArea, selection, "\t");
					break;
			}
		}
	}

	function removeIndentsFromTextArea(textArea: HTMLTextAreaElement, selection: Selection, indent: string) {
		if (isMultiLinesSelected(selection)) {

		} else {
			const [lineStart, lineEnd] = getLineStartAndEndIndexes(selection);

			const selectedLine = editorValue.slice(lineStart, lineEnd);
			const beforeSelection = editorValue.slice(0, lineStart);
			const afterSelection = editorValue.slice(lineEnd);

			const newSelectedValue = selectedLine.replace(indent, "");
			let replacements = (selectedLine.match(indent)?.length || 0);
			if (indentType === "space") replacements *= indentSize;

			setEditorValue(beforeSelection + newSelectedValue + afterSelection);

			setTimeout(() => {
				textArea.selectionStart = textArea.selectionEnd = selection.start - replacements;
			});
		}
	}

	function isMultiLinesSelected(selection: Selection) {
		return editorValue.slice(selection.start, selection.end).indexOf("\n") > -1;
	}

	function getLineStartAndEndIndexes(selection: Selection): [number, number] {
		const lineStartIndex = editorValue.lastIndexOf("\n", selection.start - 1) + 1;
		const lastEnterOnLine = editorValue.indexOf("\n", selection.end);
		const lineEndIndex = lastEnterOnLine > -1 ? lastEnterOnLine : editorValue.length - 1;

		return [lineStartIndex, lineEndIndex];
	}
}