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
		const [startIndex, endIndex] = getIndexesOfSelectedLines(selection);
		const [beforeValue, selectedValue, afterValue] = divideEditorValue(startIndex, endIndex);

		const newSelectedValue = removeIndents(selectedValue, indent);
		const replacements = countReplacements(selectedValue, indent);
		setEditorValue(beforeValue + newSelectedValue + afterValue);

		preserveSelection(textArea, selection, replacements);
	}

	function getIndexesOfSelectedLines(selection: Selection): [number ,number] {
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

	function removeIndents(selectedValue: string, indent: string) {
		const replacement = new RegExp('^' + indent, 'gm');
		return selectedValue.replace(replacement, "");
	}

	function countReplacements(selectedValue: string, indent: string) {
		const replacement = new RegExp('^' + indent, 'gm');
		const matches = selectedValue.match(replacement)?.length || 0;

		if (indentType === "tab") {
			return matches;
		} else {
			return matches * indentSize;
		}
	}

	function preserveSelection(textArea: HTMLTextAreaElement, selection: Selection, replacements: number) {
		setTimeout(() => {
			textArea.selectionStart = selection.start - (replacements ? 1 : 0);
			textArea.selectionEnd = selection.end - replacements;
			textArea.selectionDirection = selection.direction;
		});
	}
}