import {Button, Flex, Space, theme} from "antd";
import {SettingFilled} from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";

import "../style/post-constructor.scss";

interface Props {
	linesCount: number;
	value: string;
	onChange: (value: string) => void;
}

export function PostConstructor({linesCount, value, onChange}: Props) {
	const {
		token: {
			colorBorder,
			colorBgContainer,
			borderRadiusLG
		}
	} = theme.useToken();

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