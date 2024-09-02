import "../style/post.scss";

import avatarUrl from "@shared/assets/img/avatar.png";
import {theme} from "antd";
import {Link} from "react-router-dom";

export function PostInFeed() {
	const {token: {colorBorder, borderRadiusLG, colorBgContainer}} = theme.useToken();

	return (
		<article className="post" style={{
			borderColor: colorBorder,
			borderRadius: borderRadiusLG,
			backgroundColor: colorBgContainer,
		}}>
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

			<div className="post__content">
				Всем прывет, это мой новый пост!!!
			</div>
		</article>
	)
}