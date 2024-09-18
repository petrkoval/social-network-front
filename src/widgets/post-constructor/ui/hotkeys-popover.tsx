import {theme} from "antd";

import "../style/hotkeys-popover.scss";

const items = [
	{
		key: 'Tab',
		action: 'вставить табуляцию'
	},
	{
		key: 'Shift + Tab',
		action: 'удалить табуляцию'
	},
];

export function HotkeysPopover() {
	const {token: {borderRadius, colorBorder}} = theme.useToken();

	return (
		<ul className="hotkeys-popover">
			{
				items.map((item) => (
					<li key={item.key}>
						<kbd style={{
							borderColor: colorBorder,
							borderRadius,
						}}>{item.key}</kbd>
						&nbsp;- {item.action}
					</li>
				))
			}
		</ul>
	)
}