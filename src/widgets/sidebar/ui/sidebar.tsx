import {Menu, MenuProps, theme} from "antd";
import Sider from "antd/es/layout/Sider";

export function Sidebar() {
	const {token: {colorBgContainer}} = theme.useToken();

	const items: MenuProps['items'] = Array(10).fill(0).map((_, i) => ({
		key: i,
		label: `Item ${i}`,
	}));

	return (
		<Sider style={{backgroundColor: colorBgContainer}}>
			<Menu
				items={items}
				mode="inline"
			/>
		</Sider>
	)
}