import {theme} from "antd";
import TextArea from "antd/es/input/TextArea";
import markdownit from 'markdown-it'
import {
	changeEditorValue,
	changeLinesCount,
	changeViewValue,
	PostConstructorActions, selectAutoRenderTime,
	selectEditorValue,
	selectLinesCount
} from "@widgets/post-constructor";
import {useDispatch, useSelector} from "react-redux";

import "../style/post-constructor.scss";

export function PostConstructor() {
	const dispatch = useDispatch();
	const md = markdownit({
		html: true,
		linkify: true,
		typographer: true,
		xhtmlOut: true,
		breaks: true
	});

	const {
		token: {
			colorBorder,
			colorBgContainer,
			borderRadiusLG
		}
	} = theme.useToken();

	const linesCount = useSelector(selectLinesCount);
	const value = useSelector(selectEditorValue);
	const autoRenderTime = useSelector(selectAutoRenderTime);

	const onChange = (value: string) => {
		const lines = countLinesInText(value);

		dispatch(changeEditorValue(value));
		dispatch(changeLinesCount(lines));

		setTimeout(() => {
			dispatch(changeViewValue(md.render(value)));
		}, autoRenderTime * 1000);
	}

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
						  value={value}
						  onChange={e => onChange(e.target.value)}
						  spellCheck={false}
				/>
			</div>
		</div>
	)
}