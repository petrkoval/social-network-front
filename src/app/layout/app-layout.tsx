import {Layout, theme} from "antd";
import {Content} from "antd/es/layout/layout";
import {Outlet} from "react-router-dom";
import {Sidebar} from "@widgets/sidebar";
import {Header} from "@widgets/header";

export function AppLayout() {
	const {token: {colorBgContainer, borderRadiusLG}} = theme.useToken();

	return (
		<Layout style={{minHeight: "100dvh"}}>
			<Header/>
			<Content style={{padding: "3rem 6rem"}}>
				<Layout style={{background: colorBgContainer, borderRadius: borderRadiusLG}}>
					<Sidebar/>
					<Content style={{padding: "3rem"}}>
						<Outlet/>
					</Content>
				</Layout>
			</Content>
		</Layout>
	)
}