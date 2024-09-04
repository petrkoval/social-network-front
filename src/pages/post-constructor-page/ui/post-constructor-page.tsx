import {Button, Flex, Space, theme} from "antd";
import TextArea from "antd/es/input/TextArea";
import {useState} from "react";
import {SettingFilled} from "@ant-design/icons";

import "../style/post-constructor.scss";

export function PostConstructorPage() {
	const {token: {colorBorder, colorBgContainer, borderRadiusLG}} = theme.useToken();

	const [value, setValue] = useState('');

	return (
		<div className="post-constructor">
			<Flex justify="space-between" align="center" style={{marginBlock: ".5rem 1rem"}}>
				<Space>
					<Button/>
				</Space>

				<Space>
					<Button icon={<SettingFilled/>} type="primary"/>
				</Space>
			</Flex>

			<TextArea autoSize
					  style={{minHeight: "10rem"}}
					  placeholder="Начните писать код..."
					  value={value}
					  onChange={(e) => setValue(e.target.value)}
			/>

			<div className="post-constructor__view" style={{
				backgroundColor: colorBgContainer,
				borderRadius: borderRadiusLG,
				borderColor: colorBorder,
			}}>
				<pre>{value}</pre>
			</div>
		</div>
	)
}