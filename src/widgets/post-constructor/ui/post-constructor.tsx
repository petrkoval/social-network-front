import {theme} from "antd";
import TextArea from "antd/es/input/TextArea";
import markdownit from 'markdown-it'
import hljs from "highlight.js";
import {
	changeEditorValue,
	changeLinesCount,
	changeViewValue,
	PostConstructorActions,
	selectAutoRenderTime,
	selectEditorValue,
	selectLinesCount
} from "@widgets/post-constructor";
import {useDispatch, useSelector} from "react-redux";

import "../style/post-constructor.scss";
import {useEffect} from "react";

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

	const onChange = (value: string) => {
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
						  style={{lineHeight: "1.5rem"}}
						  placeholder="Начните писать код..."
						  autoSize
						  value={editorValue}
						  onChange={e => onChange(e.target.value)}
						  spellCheck={false}
				/>
			</div>
		</div>
	)
}