import {Button, ButtonProps, theme} from "antd";
import {CommentOutlined} from "@ant-design/icons";

export function CommentBtn(props: Partial<ButtonProps>) {
	const {token: {colorPrimary}} = theme.useToken();

	return (
		<>
			{
				<Button size="small" icon={<CommentOutlined style={{color: colorPrimary}}/>} {...props}>
					12
				</Button>
			}
		</>
	)
}