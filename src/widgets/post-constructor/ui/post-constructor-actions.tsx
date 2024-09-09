import {Button, Flex, Space} from "antd";
import {PostConstructorSettings} from "@widgets/post-constructor/ui/post-constructor-settings.tsx";

export function PostConstructorActions() {

	return (
		<Flex justify="space-between" align="center" style={{marginBlock: ".5rem 1rem"}}>
			<Space>
				<Button/>
			</Space>

			<Space>
				<PostConstructorSettings/>
			</Space>
		</Flex>
	)
}