import {Button, Flex, Space, theme} from "antd";
import TextArea from "antd/es/input/TextArea";
import {useState} from "react";
import {SettingFilled} from "@ant-design/icons";
import {PostContent, PostHeader} from "@entities/post";

import "../style/post-constructor.scss";
import "@entities/post/style/post.scss";

export function PostConstructorPage() {
	const {
		token: {
			colorBorder,
			colorBgContainer,
			borderRadiusLG
		}
	} = theme.useToken();

	const [value, setValue] = useState('');
	const [linesCount, setLinesCount] = useState<number>(0);

	const onChange = (value: string) => {
		setLinesCount(value.split(/\r\n|\r|\n/).length);
		setValue(value);
	}

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

			<div className="post-constructor__view post" style={{
				backgroundColor: colorBgContainer,
				borderRadius: borderRadiusLG,
				borderColor: colorBorder,
			}}>
				<PostHeader/>
				<PostContent content={value}/>
			</div>
		</div>
	)
}