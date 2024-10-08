import {Button, Checkbox, Flex, Form, Input, theme} from "antd";
import {Logo} from "@shared/ui/logo";
import {LockOutlined, UserOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";

interface FieldType {
	usernameOrEmail: string;
	password: string;
	remember: boolean;
}

export function LoginForm() {
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
				name="usernameOrEmail"
				rules={[{required: true, message: "Имя пользователя обязательно"}]}
			>
				<Input prefix={<UserOutlined/>} placeholder="Имя пользователя или email"/>
			</Form.Item>

			<Form.Item<FieldType>
				name="password"
				rules={[{required: true, message: "Пароль обязателен"}]}
			>
				<Input.Password prefix={<LockOutlined/>} placeholder="Пароль"/>
			</Form.Item>

			<Form.Item>
				<Flex justify="space-between" align="center">
					<Form.Item<FieldType>
						name="remember"
						valuePropName="checked"
						noStyle
					>
						<Checkbox>Запомнить</Checkbox>
					</Form.Item>

					<Link to="/">
						Не помню пароль
					</Link>
				</Flex>
			</Form.Item>

			<Form.Item<FieldType> noStyle>
				<Button block type="primary" htmlType="submit">
					Войти
				</Button>
				<span style={{display: "block", textAlign: "center", marginTop: ".5rem"}}>
					или <Link to="/register">Зарегистрироваться</Link>
				</span>
			</Form.Item>
		</Form>
	)
}