import {useSelector} from "react-redux";
import {HighlightThemes, selectHighlightTheme} from "@widgets/post-constructor";
import {lazy, Suspense} from "react";

const VS2015Theme = lazy(() => import("./themes/vs2015-theme.tsx"));
const SrceryTheme = lazy(() => import("./themes/srcery-theme.tsx"));
const TokyoNightDarkTheme = lazy(() => import("./themes/tokyo-night-dark-theme.tsx"));

export function ThemeProvider() {
	const theme = useSelector(selectHighlightTheme);

	function renderTheme() {
		switch (theme) {
			case HighlightThemes.vs2015:
				return <VS2015Theme/>;
			case HighlightThemes.srcery:
				return <SrceryTheme/>;
			case HighlightThemes.tokyoNightDark:
				return <TokyoNightDarkTheme/>;
			default:
				return <></>;
		}
	}

	return (
		<Suspense fallback={<></>}>
			{renderTheme()}
		</Suspense>
	)
}