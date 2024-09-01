import {CodeOutlined} from "@ant-design/icons";
import {theme} from "antd";

import "../style/logo.scss";

interface Props {
	justify: string;
	descr?: boolean;
}

export function Logo({justify, descr = false}: Props) {
	const {token: {colorPrimary, colorTextBase}} = theme.useToken();

	return (
		<div className="logo" style={{justifyContent: justify}}>

			<CodeOutlined className="logo__icon" style={{fontSize: "2.5rem", color: colorPrimary}}/>

			<div className="logo__text">
				<span className="logo__title" style={{color: colorTextBase}}>
					Codium
				</span>
				{
					descr &&
                    <span className="logo__descr" style={{color: colorPrimary}}>
						code network
					</span>
				}
			</div>

		</div>
	)
}