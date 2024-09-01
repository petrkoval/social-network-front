import {theme} from "antd";
import {motion} from "framer-motion";
import {Outlet} from "react-router-dom";

import "../style/authentication.scss";

export function AuthenticationPage() {
	const {token: {colorBgBase}} = theme.useToken();

	return (
		<div className="authentication" style={{backgroundColor: colorBgBase, minHeight: "100dvh"}}>
			<motion.div
				initial={{opacity: 0, x: "100%"}}
				animate={{opacity: 1, x: "0"}}
				exit={{opacity: 0, x: "-100%"}}
				transition={{duration: 0.25}}
			>
				<Outlet/>
			</motion.div>
		</div>
	)
}