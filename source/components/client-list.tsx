import React from "react";
import { Box, Text } from "ink";
import SelectInput from "ink-select-input";
import { Item } from "../types/types.js";

export default function ClientList() {
	const navItems = [
		{ label: "Pane 1", value: "pane_one" },
		{ label: "Pane 2", value: "pane_two" },
		{ label: "Exit", value: "exit" },
	];
	const onSelect = (value: Item<string>) => {
		console.log(value);
	};
	return (
		<Box width="7" height={"100%"} flexDirection="column">
			<Box>
				<Text>Client List</Text>
			</Box>
			<Box borderStyle="classic">
				<SelectInput items={navItems} onSelect={onSelect} />
			</Box>
		</Box>
	);
}
