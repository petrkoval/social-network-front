import {Button, Col, Drawer, Form, InputNumber, message, Row, Select, Space} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {
	HighlightThemes,
	PostConstructorOptions,
	selectAutoRenderTime,
	selectHighlightTheme,
	setOptions
} from "@widgets/post-constructor";
import {SettingFilled} from "@ant-design/icons";
import {useState} from "react";

export function PostConstructorSettings() {
	const dispatch = useDispatch();
	const [form] = Form.useForm();
	const [messageApi, messageContextHolder] = message.useMessage();

	const [settingsOpened, setSettingsOpened] = useState(false);
	const autoRenderTime = useSelector(selectAutoRenderTime);
	const highlightTheme = useSelector(selectHighlightTheme);

	const initialFormValue: PostConstructorOptions = {
		autoRenderTime,
		highlightTheme
	};

	const onFinish = (data: PostConstructorOptions) => {
		dispatch(setOptions(data));
		closeSettings();
		showSuccessMessage();
	}

	const openSettings = () => setSettingsOpened(true);
	const closeSettings = () => setSettingsOpened(false);

	const showSuccessMessage = () => messageApi.open({
		type: "success",
		content: "Настройки сохранены"
	});

	return (
		<>
			{messageContextHolder}
			<Button icon={<SettingFilled/>} type="primary" onClick={openSettings}/>
			<Drawer closable={false}
					destroyOnClose
					title="Настройки"
					placement="right"
					open={settingsOpened}
					onClose={closeSettings}
					extra={
						<Space>
							<Button onClick={closeSettings}>Отменить</Button>
							<Button type="primary" onClick={() => form.submit()}>Сохранить</Button>
						</Space>
					}>
				<Form layout="vertical"
					  requiredMark={false}
					  form={form}
					  onFinish={onFinish}
					  initialValues={initialFormValue}>
					<Row justify="center">
						<Col span={20}>
							<Form.Item<PostConstructorOptions> name="autoRenderTime" label="Время авторендера">
								<InputNumber min={0}
											 max={10000}
											 addonAfter="мс"
								/>
							</Form.Item>
						</Col>
						<Col span={24}>
							<Form.Item<PostConstructorOptions> name="highlightTheme" label="Подсветка синтаксиса">
								<Select options={[
									{value: HighlightThemes.vs2015, label: "VS Code 2015"},
									{value: HighlightThemes.srcery, label: "Srcery"},
									{value: HighlightThemes.tokyoNightDark, label: "Tokyo Night Dark"},
								]}/>
							</Form.Item>
						</Col>
					</Row>
				</Form>
			</Drawer>
		</>
	)
}