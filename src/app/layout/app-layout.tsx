import {Layout} from "antd";
import {Content, Header} from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import {Outlet} from "react-router-dom";

export function AppLayout() {
	return (
		<Layout>
			<Header/>
			<Layout>
				<Sider></Sider>
				<Content>
					<Outlet/>
				</Content>
			</Layout>
		</Layout>
	)
}