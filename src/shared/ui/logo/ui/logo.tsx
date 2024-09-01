import {CodeOutlined} from "@ant-design/icons";
import {theme} from "antd";

import "../style/logo.scss";

interface Props {
	justify: string;
}

export function Logo({ justify }: Props) {
	const {token: {colorPrimary, colorTextBase}} = theme.useToken();

	return (
		<div className="logo" style={{
			display: "flex",
			alignItems: "flex-end",
			justifyContent: justify,
			gap: ".5rem",
			userSelect: "none",
		}}>
			<CodeOutlined className="logo__icon" style={{fontSize: "2.5rem", color: colorPrimary}}/>
			<span className="logo__text" style={{
				lineHeight: "normal",
				fontSize: "2rem",
				color: colorTextBase
			}}>
				Codium
			</span>
		</div>
	)
}