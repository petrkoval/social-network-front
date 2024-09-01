import {Route, Routes, useLocation} from "react-router-dom";
import {AppLayout} from "@app/layout";
import App from "@app/app.tsx";
import {AuthenticationPage} from "@pages/authentication-page";

export function AppRoutes() {
	const location = useLocation();

	return (
		<Routes location={location} key={location.pathname}>
			<Route path="/" element={<AppLayout/>}>
				<Route index element={<App/>}/>
			</Route>
			<Route path="/authentication" element={<AuthenticationPage/>}/>
		</Routes>
	)
}