import {theme} from "antd";
import {useState} from "react";
import {PostContent, PostHeader} from "@entities/post";
import {PostConstructor} from "@widgets/post-constructor";

import "../style/post-constructor.scss";

export function PostConstructorPage() {
	const {
		token: {
			colorBorder,
			colorBgContainer,
			borderRadiusLG
		}
	} = theme.useToken();

	const [value, setValue] = useState('');
	const [linesCount, setLinesCount] = useState<number>(1);

	const onChange = (value: string) => {
		setLinesCount(value.split(/\r\n|\r|\n/).length);
		setValue(value);
	}

	return (
		<>
			<PostConstructor value={value} onChange={onChange} linesCount={linesCount} />

			<div className="post-constructor-page__view post" style={{
				backgroundColor: colorBgContainer,
				borderRadius: borderRadiusLG,
				borderColor: colorBorder,
			}}>
				<PostHeader/>
				<PostContent content={value}/>
			</div>
		</>
	)
}