import {CodeOutlined} from "@ant-design/icons";
import {theme} from "antd";

import "../style/logo.scss";

export function Logo() {
	const {token: {colorPrimary, colorTextBase}} = theme.useToken();

	return (
		<div className="logo" style={{
			display: "flex",
			alignItems: "flex-end",
			gap: ".5rem"
		}}>
			<CodeOutlined className="logo__icon" style={{fontSize: "2.5rem", color: colorPrimary}}/>
			<span className="logo__text" style={{
				lineHeight: "normal",
				fontSize: "2rem",
				color: colorTextBase
			}}>
				Network
			</span>
		</div>
	)
}