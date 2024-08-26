import {Layout, theme} from "antd";
import {Content, Header} from "antd/es/layout/layout";
import {Outlet} from "react-router-dom";
import {AppSidebar} from "../../widgets/app-sidebar";

export function AppLayout() {
	const {token: {colorBgContainer, borderRadiusLG}} = theme.useToken();

	return (
		<Layout style={{minHeight: "100dvh"}}>
			<Header style={{backgroundColor: colorBgContainer}}/>
			<Content style={{padding: "3rem 6rem"}}>
				<Layout style={{background: colorBgContainer, borderRadius: borderRadiusLG}}>
					<AppSidebar/>
					<Content style={{padding: "3rem"}}>
						<Outlet/>
					</Content>
				</Layout>
			</Content>
		</Layout>
	)
}