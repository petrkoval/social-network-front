import "../style/post.scss";

interface Props {
	content: string;
}

export function PostContent({content}: Props) {
	return (
		<div className="post__content">
			{content}
		</div>
	)
}