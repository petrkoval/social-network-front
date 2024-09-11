import {useSelector} from "react-redux";
import {selectHighlightTheme} from "@widgets/post-constructor";

import "../style/post.scss";
import "../style/themes.scss";

import "highlight.js/styles/vs2015.css"
interface Props {
	content: string;
}

export function PostContent({content}: Props) {
	const theme = useSelector(selectHighlightTheme);

	return (
		<div className="post__content" data-theme={theme} dangerouslySetInnerHTML={{__html: content}}/>
	)
}