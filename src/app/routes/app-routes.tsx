import {Route, Routes, useLocation} from "react-router-dom";
import {AppLayout} from "@app/layout";
import {AuthenticationPage, LoginForm, RegistrationForm} from "@pages/authentication-page";
import {AnimatePresence} from "framer-motion";
import {FeedPage} from "@pages/feed-page";

export function AppRoutes() {
	const location = useLocation();

	return (
		<AnimatePresence mode="wait">
			<Routes location={location} key={location.pathname}>
				<Route path="/" element={<AppLayout/>}>
					<Route index element={<FeedPage/>}/>
				</Route>
				<Route element={<AuthenticationPage/>}>
					<Route path="/login" element={<LoginForm/>}/>
					<Route path="/register" element={<RegistrationForm/>}/>
				</Route>
			</Routes>
		</AnimatePresence>
	)
}