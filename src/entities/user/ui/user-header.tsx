import {Button, Dropdown, MenuProps} from "antd";
import {Link} from "react-router-dom";
import {UserOutlined} from "@ant-design/icons";

const items: MenuProps['items'] = [
	{
		label: <Link to="/">Мой профиль</Link>,
		key: 0
	},
	{
		label: <a>Выйти</a>,
		key: 1
	},
];

export function UserHeader() {
	return (
		<Dropdown menu={{items}} trigger={['click']}>
			<Button type="default" icon={<UserOutlined/>} size="large">
				petrkoval
			</Button>
		</Dropdown>
	)
}