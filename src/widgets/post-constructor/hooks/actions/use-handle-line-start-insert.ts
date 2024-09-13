import {useDispatchChanges} from "@widgets/post-constructor";

export function useHandleLineStartInsert(textArea: HTMLTextAreaElement | undefined) {
	const [editorValue, setEditorValue] = useDispatchChanges();

	return function (action: string) {
		if (textArea) {
			const cursorPosition = textArea.selectionStart;
			const startOfCurrentLine = editorValue.lastIndexOf("\n", cursorPosition - 1) + 1;

			let newEditorValue: string;

			if (startOfCurrentLine !== -1) {
				newEditorValue = editorValue.slice(0, startOfCurrentLine) + action + editorValue.slice(startOfCurrentLine);
			} else {
				newEditorValue = action + editorValue;
			}

			setEditorValue(newEditorValue);

			setTimeout(() => {
				textArea.focus();
				textArea.selectionStart = textArea.selectionEnd = cursorPosition + action.length
			});
		}
	}
}