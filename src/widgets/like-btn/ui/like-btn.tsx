import {Button, ButtonProps, theme} from "antd";
import {HeartIcon} from "@shared/ui/icons/heart-icon.tsx";

interface Props extends Partial<ButtonProps> {
	active: boolean;
}

export function LikeBtn(props: Props) {
	const {token: {colorPrimary}} = theme.useToken();

	return (
		<>
			{
				props.active ?
					<Button type="primary" size="small" icon={<HeartIcon/>} {...props}>
						189
					</Button>
					:
					<Button size="small" icon={<HeartIcon style={{fill: colorPrimary}}/>} {...props}>
						188
					</Button>
			}
		</>
	)
}