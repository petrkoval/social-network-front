import {theme} from "antd";
import TextArea, {TextAreaRef} from "antd/es/input/TextArea";
import markdownit from 'markdown-it'
import hljs from "highlight.js";
import {
	changeEditorValue,
	changeLinesCount,
	changeViewValue,
	PostConstructorActions,
	selectAutoRenderTime,
	selectEditorValue,
	selectIndentSize,
	selectIndentType,
	selectLinesCount
} from "@widgets/post-constructor";
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useRef} from "react";

import "../style/post-constructor.scss";

export function PostConstructor() {
	const dispatch = useDispatch();
	const {
		token: {
			colorBorder,
			colorBgContainer,
			borderRadiusLG
		}
	} = theme.useToken();

	const md = markdownit({
		html: true,
		linkify: true,
		typographer: true,
		xhtmlOut: true,
		breaks: true,
		highlight: (str, lang) => {
			if (lang && hljs.getLanguage(lang)) {
				return hljs.highlight(str, {language: lang}).value;
			}

			return '';
		}
	});

	const linesCount = useSelector(selectLinesCount);
	const editorValue = useSelector(selectEditorValue);
	const autoRenderTime = useSelector(selectAutoRenderTime);
	const indentSize = useSelector(selectIndentSize);
	const indentType = useSelector(selectIndentType);

	const textAreaRef = useRef<TextAreaRef>(null);

	const handleChange = (value: string) => {
		const lines = countLinesInText(value);

		dispatch(changeEditorValue(value));
		dispatch(changeLinesCount(lines));
	}

	// dispatch changeViewValue with debounce
	useEffect(() => {
		const debounceTimer = setTimeout(() => {
			dispatch(changeViewValue(md.render(editorValue)));
		}, autoRenderTime);

		return () => clearTimeout(debounceTimer);
	}, [editorValue]);

	const countLinesInText = (data: string) => {
		return data.split(/\r\n|\r|\n/).length;
	}

	const onKeyDown = (e: React.KeyboardEvent) => {
		switch (e.key) {
			case "Tab":
				handleTabPress(e);
				break;
			default:
				return;
		}
	}

	const handleTabPress = (e: React.KeyboardEvent) => {
		e.preventDefault();

		const textArea = getTextArea();
		if (textArea) {
			const cursorPosition = textArea.selectionStart;

			switch (indentType) {
				case "space":
					insertSpaceIndentsIntoTextArea(cursorPosition);
					preserveCursorPosition(textArea, cursorPosition, indentSize);
					break;
				case "tab":
					insertTabIndentsIntoTextArea(cursorPosition);
					preserveCursorPosition(textArea, cursorPosition, 1);
					break;
			}
		}
	}

	const getTextArea = () => {
		return textAreaRef.current?.resizableTextArea?.textArea;
	}

	const insertSpaceIndentsIntoTextArea = (cursorPosition: number) => {
		const newEditorValue = editorValue.slice(0, cursorPosition) + " ".repeat(indentSize) + editorValue.slice(cursorPosition);
		handleChange(newEditorValue);
	}

	const insertTabIndentsIntoTextArea = (cursorPosition: number) => {
		const newEditorValue = editorValue.slice(0, cursorPosition) + "\t" + editorValue.slice(cursorPosition);
		handleChange(newEditorValue);
	}

	const preserveCursorPosition = (textArea: HTMLTextAreaElement, cursorPosition: number, indentSize: number) => {
		setTimeout(() => textArea.selectionStart = textArea.selectionEnd = cursorPosition + indentSize);
	}

	return (
		<div className="post-constructor">
			<PostConstructorActions/>

			<div className="post-constructor__text-enter">
				<ul className="post-constructor__lines-count" style={{
					backgroundColor: colorBgContainer,
					borderTopLeftRadius: borderRadiusLG,
					borderBottomLeftRadius: borderRadiusLG,
					borderColor: colorBorder,
				}}>
					{new Array(linesCount).fill(null).map((_, i) => (
						<li key={i}>{i + 1}</li>
					))}
				</ul>

				<TextArea className="post-constructor__text-area"
						  style={{lineHeight: "1.5rem", tabSize: indentSize}}
						  placeholder="Начните писать на Markdown..."
						  autoSize
						  value={editorValue}
						  ref={textAreaRef}
						  onChange={e => handleChange(e.target.value)}
						  onKeyDown={e => onKeyDown(e)}
						  spellCheck={false}
				/>
			</div>
		</div>
	)
}