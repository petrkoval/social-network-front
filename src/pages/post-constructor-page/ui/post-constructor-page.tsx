import {theme} from "antd";
import {PostContent, PostHeader} from "@entities/post";
import {PostConstructor, selectViewValue} from "@widgets/post-constructor";
import {useSelector} from "react-redux";

import "../style/post-constructor-page.scss";

export function PostConstructorPage() {
	const {
		token: {
			colorBorder,
			colorBgContainer,
			borderRadiusLG
		}
	} = theme.useToken();

	const viewValue = useSelector(selectViewValue);

	return (
		<>
			<PostConstructor/>

			<div className="post-constructor-page__view post" style={{
				backgroundColor: colorBgContainer,
				borderRadius: borderRadiusLG,
				borderColor: colorBorder,
			}}>
				<PostHeader/>
				{viewValue.length !== 0 && <PostContent content={viewValue}/>}
			</div>
		</>
	)
}