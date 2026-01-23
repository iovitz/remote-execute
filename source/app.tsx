import React, {PropsWithChildren} from 'react';
import {Box} from 'ink';
import {SocketProvider} from './socket/socket-context.js';
import ClientList from './components/client-list.js';
import Content from './components/content.js';

function MainLayout({children}: PropsWithChildren) {
	return <Box borderStyle="classic">{children}</Box>;
}

export default function App() {
	return (
		<SocketProvider>
			<MainLayout>
				<ClientList />
				<Content />
			</MainLayout>
		</SocketProvider>
	);
}
