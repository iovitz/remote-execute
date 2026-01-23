import React from "react";
import { Box, Text } from "ink";
import SelectInput from "ink-select-input";
import { useSocket } from "../socket/socket-context.js";
import { Item } from "../types/types.js";

export default function ClientList() {
	const { clients, selectClient } = useSocket();

	// Convert clients to select items
	const clientItems: Item<string>[] = clients.map((client) => ({
		label: client.id.slice(0, 6),
		value: client.id,
		key: client.id,
	}));

	const handleSelect = (item: Item<string>) => {
		selectClient(item.value);
	};

	return (
		<Box width={30} height={"100%"} flexDirection="column">
			<Box borderStyle="classic">
				<Text color="cyan" bold>
					Connected Clients ({clients.length})
				</Text>
			</Box>
			<Box borderStyle="classic" flexGrow={1}>
				{clients.length === 0 ? (
					<Box padding={1}>
						<Text color="gray">No clients connected</Text>
					</Box>
				) : (
					<SelectInput
						items={clientItems}
						onSelect={handleSelect}
						indicatorComponent={({ isSelected }) => (
							<Text color={isSelected ? "green" : "gray"}>{isSelected ? "▶" : "○"}</Text>
						)}
					/>
				)}
			</Box>
		</Box>
	);
}
