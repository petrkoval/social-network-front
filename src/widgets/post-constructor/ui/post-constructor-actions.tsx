import {Button, Dropdown, Flex, MenuProps, Popover, Radio, Space, Tooltip} from "antd";
import {
	BoldOutlined,
	BorderVerticleOutlined,
	CaretDownOutlined,
	CaretUpFilled,
	CodeOutlined,
	EllipsisOutlined,
	EnterOutlined,
	FieldStringOutlined,
	FileImageOutlined,
	FontColorsOutlined,
	FontSizeOutlined,
	ItalicOutlined,
	LinkOutlined,
	OrderedListOutlined,
	QuestionCircleOutlined,
	SelectOutlined,
	SnippetsOutlined,
	StrikethroughOutlined,
	TableOutlined,
	TagOutlined,
	UnderlineOutlined,
	UnorderedListOutlined,
	VerticalAlignBottomOutlined
} from "@ant-design/icons";
import {HotkeysPopover, PostConstructorActionsEnum, PostConstructorSettings} from "@widgets/post-constructor";

interface Props {
	handleAction: (actionType: PostConstructorActionsEnum, action: string) => void
}

const headerMenuItems: MenuProps['items'] = new Array(6).fill(null).map((_, i) => ({
	key: "#".repeat(i + 1) + " ",
	label: `H${i + 1}`
}));

const otherFormattingMenuItems: MenuProps['items'] = [
	{
		key: '0',
		label: (
			<Space><TagOutlined/>Тег</Space>
		)
	},
	{
		key: '1',
		label: (
			<Space><VerticalAlignBottomOutlined/>Спойлер</Space>
		)
	},
	{
		key: '2',
		label: (
			<Space><CaretDownOutlined/>Подстрочный индекс</Space>
		)
	},
	{
		key: '3',
		label: (
			<Space><CaretUpFilled/>Надстрочный</Space>
		)
	},
	{
		key: '4',
		label: (
			<Space><FontColorsOutlined/>Клавиатура</Space>
		)
	},
	{
		key: '5',
		label: (
			<Space><SelectOutlined/>Экранирование</Space>
		)
	},
	{
		key: '6',
		label: (
			<Space><EnterOutlined/>Перенос строки</Space>
		)
	},
];

export function PostConstructorActions(props: Props) {

	const onHeaderActionClick: MenuProps['onClick'] = ({key}) => {
		props.handleAction(PostConstructorActionsEnum.lineStartInsert, key);
	}

	return (
		<Flex justify="space-between" align="center" style={{marginBlock: ".5rem 1rem"}}>
			<Space>
				<Tooltip title="Заголовок">
					<Dropdown menu={{items: headerMenuItems, onClick: onHeaderActionClick}}>
						<Button icon={<FontSizeOutlined/>}>
							<CaretDownOutlined/>
						</Button>
					</Dropdown>
				</Tooltip>

				<Space.Compact>
					<Tooltip title="Курсив">
						<Button icon={<ItalicOutlined/>}/>
					</Tooltip>
					<Tooltip title="Жирный">
						<Button icon={<BoldOutlined/>}/>
					</Tooltip>
					<Tooltip title="Зачеркнутый">
						<Button icon={<StrikethroughOutlined/>}/>
					</Tooltip>
					<Tooltip title="Подчеркнутый">
						<Button icon={<UnderlineOutlined/>}/>
					</Tooltip>
				</Space.Compact>

				<Space.Compact>
					<Tooltip title="Встроенный код">
						<Button icon={<FieldStringOutlined/>}/>
					</Tooltip>
					<Tooltip title="Блок кода">
						<Button icon={<CodeOutlined/>}/>
					</Tooltip>
				</Space.Compact>

				<Space.Compact>
					<Tooltip title="Ссылка">
						<Button icon={<LinkOutlined/>}/>
					</Tooltip>
					<Tooltip title="Цитата">
						<Button icon={<SnippetsOutlined/>}/>
					</Tooltip>
					<Tooltip title="Изображение">
						<Button icon={<FileImageOutlined/>}/>
					</Tooltip>
					<Tooltip title="Таблица">
						<Button icon={<TableOutlined/>}/>
					</Tooltip>
				</Space.Compact>

				<Space.Compact>
					<Tooltip title="Нумерованный список">
						<Button icon={<OrderedListOutlined/>}/>
					</Tooltip>
					<Tooltip title="Ненумерованный список">
						<Button icon={<UnorderedListOutlined/>}/>
					</Tooltip>
					<Tooltip title="Разделитель">
						<Button icon={<BorderVerticleOutlined/>}/>
					</Tooltip>
				</Space.Compact>

				<Dropdown menu={{items: otherFormattingMenuItems}}>
					<Button icon={<EllipsisOutlined/>}/>
				</Dropdown>
			</Space>

			<Space>
				<Popover content={HotkeysPopover} title="Горячие клавиши" trigger="click" placement="bottomLeft">
					<Tooltip title="Горячие клавиши">
						<Button type="link" icon={<QuestionCircleOutlined/>}/>
					</Tooltip>
				</Popover>

				<Radio.Group defaultValue="MP" buttonStyle="solid">
					<Tooltip title="Расширенный режим">
						<Radio.Button value="R">R</Radio.Button>
					</Tooltip>
					<Tooltip title="Markdown">
						<Radio.Button value="M">M</Radio.Button>
					</Tooltip>
					<Tooltip title="Markdown с предпросмотром">
						<Radio.Button value="MP">MP</Radio.Button>
					</Tooltip>
				</Radio.Group>

				<PostConstructorSettings/>
			</Space>
		</Flex>
	)
}