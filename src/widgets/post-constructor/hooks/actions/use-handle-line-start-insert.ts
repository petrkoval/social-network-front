import {Selection, useDispatchChanges, useHelpers} from "@widgets/post-constructor";

export function useHandleLineStartInsert(textArea: HTMLTextAreaElement | undefined) {
	const [, setEditorValue] = useDispatchChanges();
	const {getIndexesOfSelectedLines, divideEditorValue} = useHelpers();

	return function (action: string) {
		if (textArea) {
			const selection: Selection = {
				start: textArea.selectionStart,
				end: textArea.selectionEnd,
				direction: textArea.selectionDirection
			};

			const [startIndex, endIndex] = getIndexesOfSelectedLines(selection);
			const [beforeValue, selectedValue, afterValue] = divideEditorValue(startIndex, endIndex);

			const newSelectedValue = insertActions(selectedValue, action);
			const replacements = countReplacements(selectedValue, action);
			setEditorValue(beforeValue + newSelectedValue + afterValue);

			preserveSelection(textArea, selection, action, replacements);
		}
	}

	function insertActions(selectedValue: string, action: string) {
		const replacement = new RegExp('^', "gm");
		return selectedValue.replace(replacement, action);
	}

	function countReplacements(selectedValue: string, action: string) {
		const replacement = new RegExp('^' + action, "gm");
		return selectedValue.match(replacement)?.length || 0;
	}

	function preserveSelection(textArea: HTMLTextAreaElement, selection: Selection, action: string, replacements: number) {
		setTimeout(() => {
			textArea.selectionStart = selection.start + (replacements ? action.length : 0);
			textArea.selectionEnd = selection.end + replacements * action.length;
			textArea.selectionDirection = selection.direction;
		});
	}
}