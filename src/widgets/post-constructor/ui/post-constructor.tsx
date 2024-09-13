import {
	PostConstructorActions,
	selectIndentSize,
	selectLinesCount,
	useDispatchChanges,
	useHandleHotkeys
} from "@widgets/post-constructor";
import {theme} from "antd";
import TextArea, {TextAreaRef} from "antd/es/input/TextArea";
import {useSelector} from "react-redux";
import {useRef} from "react";

import "../style/post-constructor.scss";

export function PostConstructor() {
	const {
		token: {
			colorBorder,
			colorBgContainer,
			borderRadiusLG
		}
	} = theme.useToken();

	const linesCount = useSelector(selectLinesCount);
	const indentSize = useSelector(selectIndentSize);

	const textAreaRef = useRef<TextAreaRef>(null);

	const [editorValue, setEditorValue] = useDispatchChanges();
	const handleHotKeys = useHandleHotkeys(textAreaRef, setEditorValue);

	const handleHeaderActionPress = (action: string) => {
		const textArea = getTextArea();
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

	const getTextArea = () => {
		return textAreaRef.current?.resizableTextArea?.textArea;
	}

	return (
		<div className="post-constructor">
			<PostConstructorActions handleHeaderActionPress={handleHeaderActionPress}/>

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
						  onChange={e => setEditorValue(e.target.value)}
						  onKeyDown={e => handleHotKeys(e)}
						  spellCheck={false}
				/>
			</div>
		</div>
	)
}