import {Button, Empty, theme, Typography} from "antd";
import {useNavigate} from "react-router-dom";

export function ErrorPage() {
	const {
		token: {
			colorBorder,
			borderRadiusLG,
			colorBgContainer,
			colorBgBase
		}
	} = theme.useToken();

	const navigate = useNavigate();

	return (
		<section className="empty-page" style={{
			minHeight: "100dvh",
			backgroundColor: colorBgBase,
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
		}}>
			<div className="epmty-page__wrapper">
				<Empty style={{
					border: "1px solid",
					borderColor: colorBorder,
					borderRadius: borderRadiusLG,
					backgroundColor: colorBgContainer,
					padding: "2rem"
				}} description={
					<Typography.Text>
						Здесь ничего нет <br/>
						<Button type="link" onClick={() => navigate(-1)}>Вернуться назад</Button>
					</Typography.Text>
				}/>
			</div>
		</section>
	)
}