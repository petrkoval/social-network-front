import {Button, Checkbox, Form, Input, theme} from "antd";
import {Logo} from "@shared/ui/logo";
import {LockOutlined, UserOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";

interface FieldType {
	email: string;
	username: string;
	password: string;
	remember: boolean;
}

export function RegistrationForm() {
	const {token: {colorBgContainer, borderRadiusLG}} = theme.useToken();

	return (
		<Form className="authentication__form" style={{
			backgroundColor: colorBgContainer,
			borderRadius: borderRadiusLG,
		}}>
			<Form.Item>
				<Logo justify="center" descr/>
			</Form.Item>

			<Form.Item<FieldType>
				name="email"
				rules={[{required: true, message: "Email обязателен"}]}
			>
				<Input prefix={<UserOutlined/>} placeholder="Email"/>
			</Form.Item>

			<Form.Item<FieldType>
				name="username"
				rules={[{required: true, message: "Имя пользователя обязательно"}]}
			>
				<Input prefix={<UserOutlined/>} placeholder="Имя пользователя"/>
			</Form.Item>

			<Form.Item<FieldType>
				name="password"
				rules={[{required: true, message: "Пароль обязателен"}]}
			>
				<Input.Password prefix={<LockOutlined/>} placeholder="Пароль"/>
			</Form.Item>

			<Form.Item<FieldType>
				name="remember"
				valuePropName="checked"
			>
				<Checkbox>Запомнить меня</Checkbox>
			</Form.Item>

			<Form.Item<FieldType> noStyle>
				<Button block type="primary" htmlType="submit">
					Регистрация
				</Button>
				<Link to="/login" style={{display: "block", textAlign: "center", marginTop: ".5rem"}}>
					У меня есть аккаунт
				</Link>
			</Form.Item>
		</Form>
	)
}