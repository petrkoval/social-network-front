import {useSelector} from "react-redux";
import {selectIndentSize, selectIndentType, Selection, useDispatchChanges, useHelpers} from "@widgets/post-constructor";

export function useHandleRemoveTabulation(textArea: HTMLTextAreaElement | undefined) {
	const indentSize = useSelector(selectIndentSize);
	const indentType = useSelector(selectIndentType);
	const [, setEditorValue] = useDispatchChanges();
	const {getIndexesOfSelectedLines, divideEditorValue} = useHelpers();

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