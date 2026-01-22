import React, { PropsWithChildren } from "react";
import { Box, Text } from "ink";

function MainLayout({ children }: PropsWithChildren) {
	return <Box>{children}</Box>;
}

function SideBar() {
	return (
		<Box borderStyle={"single"} height={"100%"} width={40}>
			<Text>I'm a sidebar</Text>
		</Box>
	);
}

function Content() {
	return (
		<Box width={"100%"} height={"100%"} borderStyle={"single"}>
			<Text>Im' the content area</Text>
		</Box>
	);
}

export default function App() {
	return (
		<MainLayout>
			<SideBar />
			<Content />
		</MainLayout>
	);
}
