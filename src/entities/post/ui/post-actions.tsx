import {LikeBtn} from "@widgets/like-btn";
import {CommentBtn} from "@widgets/comment-btn";
import {Space} from "antd";
import {useState} from "react";

export function PostActions() {
	const [liked, setLiked] = useState(false);

	const toggleLike = () => {
		setLiked(!liked);
	}

	return (
		<Space>
			<LikeBtn active={liked} onClick={toggleLike}/>
			<CommentBtn/>
		</Space>
	)
}