import {theme} from "antd";

import "../style/post-constructor.scss";
import TextArea from "antd/es/input/TextArea";
import {useState} from "react";

export function PostConstructorPage() {
	const {token: {colorBgContainer, colorBorder, borderRadiusLG}} = theme.useToken();

	const [value, setValue] = useState('');

	return (
		<div className="post-constructor" style={{
			backgroundColor: colorBgContainer,
			borderColor: colorBorder,
			borderRadius: borderRadiusLG,
		}}>
			<div className="post-constructor__actions">

			</div>
			<TextArea autoSize style={{minHeight: "10rem"}} value={value} onChange={(e) => setValue(e.target.value)}>

			</TextArea>
		</div>
	)
}