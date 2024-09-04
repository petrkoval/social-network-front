import {Button, Flex, Space} from "antd";

import "../style/post-constructor.scss";
import TextArea from "antd/es/input/TextArea";
import {useState} from "react";
import {SettingFilled} from "@ant-design/icons";

export function PostConstructorPage() {
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

			<TextArea autoSize style={{minHeight: "10rem"}} value={value} onChange={(e) => setValue(e.target.value)}/>
		</div>
	)
}