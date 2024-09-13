import {
	PostConstructorActions,
	selectIndentSize,
	selectLinesCount,
	useDispatchChanges,
	useHandleActions,
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
	const handleHotKeys = useHandleHotkeys(textAreaRef);
	const handleAction = useHandleActions(textAreaRef);

	return (
		<div className="post-constructor">
			<PostConstructorActions handleAction={handleAction}/>

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