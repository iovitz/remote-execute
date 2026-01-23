import React, { PropsWithChildren } from "react";
import { Box, Text } from "ink";
import ClientList from "./components/client-list.js";

function MainLayout({ children }: PropsWithChildren) {
	return <Box borderStyle="classic">{children}</Box>;
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
			<ClientList />
			<Content />
		</MainLayout>
	);
}
