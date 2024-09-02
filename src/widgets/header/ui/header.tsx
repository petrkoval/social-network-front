import {Header as AntHeader} from "antd/es/layout/layout";
import {theme} from "antd";
import {Logo} from "@shared/ui/logo";
import {Link} from "react-router-dom";
import {UserHeader} from "@entities/user";

export function Header() {
	const {token: {colorBgContainer}} = theme.useToken();

	return (
		<AntHeader style={{
			backgroundColor: colorBgContainer,
			display: "flex",
			alignItems: "center",
			justifyContent: "space-between",
			paddingInline: "20rem"
		}}>
			<Link to="/">
				<Logo/>
			</Link>

			<UserHeader/>
		</AntHeader>
	)
}