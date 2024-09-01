import {theme} from "antd";

import "../style/authentication.scss";
import {LoginForm} from "@pages/authentication-page";

export function AuthenticationPage() {
	const {token: {colorBgBase}} = theme.useToken();

	return (
		<div className="authentication" style={{backgroundColor: colorBgBase, minHeight: "100dvh"}}>
			<LoginForm/>
		</div>
	)
}