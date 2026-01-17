import { Box, Text } from "ink";
import React from "react";
import { useWindowSize } from "../hooks/use-window-size";

export const Layout = () => {
	const windowSize = useWindowSize();
	console.log(windowSize);
	return (
		<Box width="100%" height="100%" borderStyle="round" borderColor="green">
			<Box width="100%" height="auto" borderStyle="single" borderColor="blue">
				<Text>Hello</Text>
			</Box>
			<Box width="100%" height="100%" flexDirection="column" paddingX={1} paddingY={1}>
				<Text>这是全屏窗口内容区域，与控制台一样大</Text>
				<Text>
					当前窗口大小: {process.stdout.columns} x {process.stdout.rows}
				</Text>
			</Box>
		</Box>
	);
};
