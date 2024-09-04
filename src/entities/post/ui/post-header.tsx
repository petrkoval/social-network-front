import avatarUrl from "@shared/assets/img/avatar.png";
import {Link} from "react-router-dom";

export function PostHeader() {
	return (
		<header className="post__header">
			<div className="post__author-info">
				<img src={avatarUrl} alt="author's avatar" className="post__avatar"/>

				<div className="post__author-info-inner">
						<span className="post__author-name">
							Пётр Коваль
						</span>
					<Link to="/" className="post__author-tag">
						@petrkoval
					</Link>
				</div>
			</div>

			<time className="post__time">5 минут назад</time>
		</header>
	)
}