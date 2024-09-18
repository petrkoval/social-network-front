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
			const [startIndex, endIndex] = getIndexesOfSelectedLines(selection);
			const [beforeValue, selectedValue, afterValue] = divideEditorValue(startIndex, endIndex);

			const newSelectedValue = insertIndents(selectedValue, indent);
			const replacements = countReplacements(selectedValue);
			setEditorValue(beforeValue + newSelectedValue + afterValue);

			preserveSelection(textArea, selection, replacements);
		} else {
			const newEditorValue = insertInlineIndent(selection, indent);
			setEditorValue(newEditorValue);

			preserveInlineSelection(textArea, selection);
		}
	}

	function isMultiLinesSelected(selection: Selection) {
		return selection.start !== selection.end;
	}

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

	function insertIndents(selectedValue: string, indent: string) {
		const replacement = new RegExp('^', 'gm');
		return selectedValue.replace(replacement, indent);
	}

	function countReplacements(selectedValue: string) {
		const replacement = new RegExp('^', 'gm');
		const matches = selectedValue.match(replacement)?.length || 0;

		if (indentType === "tab") {
			return matches;
		} else {
			return matches * indentSize;
		}
	}

	function preserveSelection(textArea: HTMLTextAreaElement, selection: Selection, replacements: number) {
		setTimeout(() => {
			textArea.selectionStart = selection.start + (replacements ? 1 : 0);
			textArea.selectionEnd = selection.end + replacements;
		});
	}

	function insertInlineIndent(selection: Selection, indent: string) {
		const beforeValue = editorValue.slice(0, selection.start);
		const afterValue = editorValue.slice(selection.start);

		return beforeValue + indent + afterValue;
	}

	function preserveInlineSelection(textArea: HTMLTextAreaElement, selection: Selection) {
		setTimeout(() => {
			if (indentType === "tab") {
				textArea.selectionStart = textArea.selectionEnd = selection.start + 1;
			} else {
				textArea.selectionStart = textArea.selectionEnd = selection.start + indentSize;
			}
		});
	}
}