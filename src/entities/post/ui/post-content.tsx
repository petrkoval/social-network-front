import "../style/post.scss";
import {ThemeProvider} from "@shared/ui/highlight-js-themes";

interface Props {
	content: string;
}

export function PostContent({content}: Props) {
	return (
		<>
			<ThemeProvider/>
			<div className="post__content" dangerouslySetInnerHTML={{__html: content}}/>
		</>
	)
}