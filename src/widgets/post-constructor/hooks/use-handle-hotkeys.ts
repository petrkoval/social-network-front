import React from "react";
import {TextAreaRef} from "antd/es/input/TextArea";
import {useHandleTabPress} from "@widgets/post-constructor";

export function useHandleHotkeys(
	textAreaRef: React.RefObject<TextAreaRef>,
	setEditorValue: (value: string) => void
) {
	const textArea = getTextArea();

	const handleTabPress = useHandleTabPress(textArea, setEditorValue);

	return function (e: React.KeyboardEvent) {
		if (e.key === "Tab") {
			e.preventDefault();
			handleTabPress();
		}
	}

	function getTextArea() {
		return textAreaRef.current?.resizableTextArea?.textArea;
	}
}