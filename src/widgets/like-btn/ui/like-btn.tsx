import {Button, ButtonProps, theme} from "antd";
import {HeartFilled, HeartOutlined} from "@ant-design/icons";

interface Props extends Partial<ButtonProps> {
	active: boolean;
}

export function LikeBtn(props: Props) {
	const {token: {colorPrimary}} = theme.useToken();

	return (
		<>
			{
				props.active ?
					<Button type="primary" size="small" icon={<HeartFilled/>} {...props}>
						189
					</Button>
					:
					<Button size="small" icon={<HeartOutlined style={{color: colorPrimary}}/>} {...props}>
						188
					</Button>
			}
		</>
	)
}