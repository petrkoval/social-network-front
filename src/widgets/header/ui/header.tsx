import {Header as AntHeader} from "antd/es/layout/layout";
import {theme} from "antd";
import {Logo} from "@shared/ui/logo";
import {Link} from "react-router-dom";

export function Header() {
	const {token: {colorBgContainer}} = theme.useToken();

	return (
		<AntHeader style={{
			backgroundColor: colorBgContainer,
			display: "flex",
			alignItems: "center",
			paddingInline: "20rem"
		}}>
			<Link to="/">
				<Logo/>
			</Link>
		</AntHeader>
	)
}