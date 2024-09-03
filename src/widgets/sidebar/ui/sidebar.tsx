import {Menu, MenuProps, theme} from "antd";
import Sider from "antd/es/layout/Sider";
import {Link, useLocation} from "react-router-dom";
import {AlignLeftOutlined, FormOutlined, UserOutlined} from "@ant-design/icons";

export function Sidebar() {
	const {token: {borderRadiusLG}} = theme.useToken();
	const location = useLocation();

	const items: MenuProps['items'] = [
		{
			key: "/create",
			label: <Link to="/create">Создать пост</Link>,
			icon: <FormOutlined/>
		},
		{
			type: "divider"
		},
		{
			key: "/",
			label: <Link to="/">Моя страница</Link>,
			icon: <UserOutlined/>
		},
		{
			key: "/feed",
			label: <Link to="/feed">Лента</Link>,
			icon: <AlignLeftOutlined/>
		}
	];

	return (
		<Sider style={{borderRadius: borderRadiusLG, height: "auto", backgroundColor: "transparent"}}>
			<Menu
				style={{borderRadius: borderRadiusLG}}
				items={items}
				selectedKeys={[location.pathname]}
				mode="inline"
			/>
		</Sider>
	)
}