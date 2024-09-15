import React from "react";
import {TextAreaRef} from "antd/es/input/TextArea";
import {useHandleInsertTabulation, useHandleRemoveTabulation} from "@widgets/post-constructor";

export function useHandleHotkeys(textAreaRef: React.RefObject<TextAreaRef>) {
	const textArea = getTextArea();

	const handleInsertTabulation = useHandleInsertTabulation(textArea);
	const handleRemoveTabulation = useHandleRemoveTabulation(textArea);

	return function (e: React.KeyboardEvent) {
		if (e.key === "Tab" && e.shiftKey) {
			e.preventDefault();
			handleRemoveTabulation();
		} else if (e.key === "Tab") {
			e.preventDefault();
			handleInsertTabulation();
		}
	}

	function getTextArea() {
		return textAreaRef.current?.resizableTextArea?.textArea;
	}
}