import {Layout, theme} from "antd";
import {Content} from "antd/es/layout/layout";
import {Outlet} from "react-router-dom";
import {Sidebar} from "@widgets/sidebar";
import {Header} from "@widgets/header";
import {motion} from "framer-motion";

export function AppLayout() {
	const {token: {borderRadiusLG}} = theme.useToken();

	return (
		<Layout style={{minHeight: "100dvh"}}>
			<Header/>
			<Content style={{padding: "3rem 30rem"}}>
				<Layout style={{borderRadius: borderRadiusLG}}>
					<Sidebar/>
					<Content style={{paddingLeft: "1rem"}}>
						<motion.div
							initial={{opacity: 0}}
							animate={{opacity: 1}}
							exit={{opacity: 0}}
							transition={{duration: 0.2}}
						>
							<Outlet/>
						</motion.div>
					</Content>
				</Layout>
			</Content>
		</Layout>
	)
}