import {Button, ButtonProps, theme} from "antd";
import {HeartFilled, HeartOutlined} from "@ant-design/icons";

interface Props extends Partial<ButtonProps> {
	active: boolean;
}

export function LikeBtn(props: Props) {
	const {active, ...restProps} = props;

	const {token: {colorPrimary}} = theme.useToken();

	return (
		<>
			{
				active ?
					<Button type="primary" size="small" icon={<HeartFilled/>} {...restProps}>
						189
					</Button>
					:
					<Button size="small" icon={<HeartOutlined style={{color: colorPrimary}}/>} {...restProps}>
						188
					</Button>
			}
		</>
	)
}