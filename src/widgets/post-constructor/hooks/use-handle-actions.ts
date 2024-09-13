import {PostConstructorActionsEnum, useHandleLineStartInsert} from "@widgets/post-constructor";
import React from "react";
import {TextAreaRef} from "antd/es/input/TextArea";

export function useHandleActions(textAreaRef: React.RefObject<TextAreaRef>) {
	const textArea = getTextArea();

	const handleLineStartInsertAction = useHandleLineStartInsert(textArea);

	return function (actionType: PostConstructorActionsEnum, action: string) {
		switch (actionType) {
			case PostConstructorActionsEnum.lineStartInsert:
				handleLineStartInsertAction(action);
				break;
		}
	}

	function getTextArea() {
		return textAreaRef.current?.resizableTextArea?.textArea;
	}
}