import {PostInFeed} from "@entities/post";

import "../style/feed-page.scss";

export function FeedPage() {
	const posts = [0, 0, 0];

	return posts.map(() => <PostInFeed/>)
}