import {Menu, MenuProps, theme} from "antd";
import Sider from "antd/es/layout/Sider";
import {Link} from "react-router-dom";
import {AlignLeftOutlined, FormOutlined, UserOutlined} from "@ant-design/icons";

export function Sidebar() {
	const {token: {borderRadiusLG}} = theme.useToken();

	const items: MenuProps['items'] = [
		{
			key: 0,
			label: <Link to="/create">Создать пост</Link>,
			icon: <FormOutlined/>
		},
		{
			type: "divider"
		},
		{
			key: "1",
			label: <Link to="/">Моя страница</Link>,
			icon: <UserOutlined/>
		},
		{
			key: "2",
			label: <Link to="/feed">Лента</Link>,
			icon: <AlignLeftOutlined/>
		}
	];

	return (
		<Sider style={{borderRadius: borderRadiusLG, height: "auto", backgroundColor: "transparent"}}>
			<Menu
				style={{borderRadius: borderRadiusLG}}
				items={items}
				mode="inline"
			/>
		</Sider>
	)
}