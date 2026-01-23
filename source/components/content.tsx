import React, { useState } from "react";
import { Box, Text, useInput } from "ink";
import { useSocket } from "../socket/socket-context.js";

export default function Content() {
	const { selectedClientId, clients, sendCommandToSelected } = useSocket();
	const [commandHistory, setCommandHistory] = useState<string[]>([]);
	const [currentCommand, setCurrentCommand] = useState("");

	useInput((input, key) => {
		if (!selectedClientId) return;

		if (key.return) {
			// Execute command
			if (currentCommand.trim()) {
				sendCommandToSelected(currentCommand);
				setCommandHistory((prev) => [...prev, `> ${currentCommand}`]);
				setCurrentCommand("");
			}
		} else if (key.backspace) {
			setCurrentCommand((prev) => prev.slice(0, -1));
		} else if (input && !key.ctrl && !key.meta) {
			setCurrentCommand((prev) => prev + input);
		}
	});

	const selectedClient = clients.find((c) => c.id === selectedClientId);

	return (
		<Box width={"100%"} height={"100%"} borderStyle="classic" flexDirection="column">
			<Box marginBottom={1}>
				<Text color="green" bold>
					{selectedClient ? `Client: ${selectedClient.title}` : "No client selected"}
				</Text>
			</Box>

			{selectedClient ? (
				<>
					<Box flexGrow={1} flexDirection="column">
						<Box marginBottom={1}>
							<Text color="cyan">Command History:</Text>
						</Box>
						<Box flexGrow={1}>
							{commandHistory.length === 0 ? (
								<Text color="gray">No commands executed yet</Text>
							) : (
								commandHistory.map((cmd, index) => <Text key={index}>{cmd}</Text>)
							)}
						</Box>

						<Box marginTop={1}>
							<Text color="yellow">debug&gt; {currentCommand}</Text>
							<Text color="gray">_</Text>
						</Box>
					</Box>
				</>
			) : (
				<Box justifyContent="center" alignItems="center" flexGrow={1}>
					<Text color="gray">Select a client from the list to start debugging</Text>
				</Box>
			)}
		</Box>
	);
}
