import {theme} from "antd";
import {PostActions, PostContent, PostHeader} from "@entities/post";

import "../style/post.scss";

export function PostInFeed() {
	const {
		token: {
			colorBorder,
			borderRadiusLG,
			colorBgContainer
		}
	} = theme.useToken();


	return (
		<article className="post" style={{
			borderColor: colorBorder,
			borderRadius: borderRadiusLG,
			backgroundColor: colorBgContainer,
		}}>
			<PostHeader/>

			<PostContent content="Всем прывет это мой новый пост!!!"/>

			<PostActions/>
		</article>
	)
}