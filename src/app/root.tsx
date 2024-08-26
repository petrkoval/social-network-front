import {createRoot} from "react-dom/client";
import {Providers} from "@app/providers";
import {AppRoutes} from "@app/routes";

import "./style/index.scss";

createRoot(document.getElementById("root")!).render(
	<Providers>
		<AppRoutes/>
	</Providers>
);