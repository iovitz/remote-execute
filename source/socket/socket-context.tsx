import React, {createContext, useContext, useEffect, useState} from 'react';
import SocketServer, {ClientInfo} from './socket-server.js';

interface SocketContextType {
	clients: ClientInfo[];
	isServerRunning: boolean;
	selectedClientId: string | null;
	selectClient: (clientId: string | null) => void;
	sendCommand: (clientId: string, command: string) => boolean;
	sendCommandToSelected: (command: string) => boolean;
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export const useSocket = () => {
	const context = useContext(SocketContext);
	if (!context) {
		throw new Error('useSocket must be used within a SocketProvider');
	}
	return context;
};

interface SocketProviderProps {
	children: React.ReactNode;
	port?: number;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({
	children,
	port = 7890,
}) => {
	const [clients, setClients] = useState<ClientInfo[]>([]);
	const [isServerRunning, setIsServerRunning] = useState(false);
	const [selectedClientId, setSelectedClientId] = useState<string | null>(null);
	const [socketServer, setSocketServer] = useState<SocketServer | null>(null);

	useEffect(() => {
		// Initialize Socket.IO server
		const server = new SocketServer(port);
		setSocketServer(server);
		setIsServerRunning(true);

		// Set up event listeners
		server.onClientConnect(client => {
			setClients(prev => {
				// Check if client already exists
				const existingIndex = prev.findIndex(c => c.id === client.id);
				if (existingIndex >= 0) {
					// Update existing client
					const updated = [...prev];
					updated[existingIndex] = client;
					return updated;
				}
				// Add new client
				return [...prev, client];
			});
		});

		server.onClientDisconnect(socketId => {
			setClients(prev => prev.filter(client => client.id !== socketId));
			// Clear selection if disconnected client was selected
			setSelectedClientId(prev => (prev === socketId ? null : prev));
		});

		return () => {
			// Cleanup will be handled by the server itself
			setIsServerRunning(false);
		};
	}, [port]);

	const selectClient = (clientId: string | null) => {
		setSelectedClientId(clientId);
	};

	const sendCommand = (clientId: string, command: string): boolean => {
		if (!socketServer) return false;

		return socketServer.sendCommand(clientId, {
			cmd: command,
			desc: 'CLI command',
		});
	};

	const sendCommandToSelected = (command: string): boolean => {
		if (!selectedClientId) return false;
		return sendCommand(selectedClientId, command);
	};

	const value: SocketContextType = {
		clients,
		isServerRunning,
		selectedClientId,
		selectClient,
		sendCommand,
		sendCommandToSelected,
	};

	return (
		<SocketContext.Provider value={value}>{children}</SocketContext.Provider>
	);
};
