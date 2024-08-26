import {Layout, theme} from "antd";
import {Content, Header} from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import {Outlet} from "react-router-dom";

export function AppLayout() {
	const {token: {colorBgContainer, borderRadiusLG}} = theme.useToken();

	return (
		<Layout style={{minHeight: "100dvh"}}>
			<Header style={{backgroundColor: colorBgContainer}}/>
			<Content style={{
				padding: "3rem"
			}}>
				<Layout style={{background: colorBgContainer, borderRadius: borderRadiusLG}}>
					<Sider style={{width: "200px", backgroundColor: colorBgContainer}}/>
					<Content style={{padding: "3rem"}}>
						<Outlet/>
					</Content>
				</Layout>
			</Content>
		</Layout>
	)
}