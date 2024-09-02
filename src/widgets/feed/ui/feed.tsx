import {PostInFeed} from "@entities/post";

import "../style/feed.scss";

export function Feed() {
	const posts = [0, 0, 0];

	return posts.map(() => <PostInFeed/>)
}