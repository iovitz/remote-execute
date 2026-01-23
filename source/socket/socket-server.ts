import { Server as SocketIOServer, Socket } from "socket.io";
import { createServer } from "http";
import { Server as HttpServer } from "http";

export interface ClientInfo {
	id: string;
	url: string;
	ua: string;
	title: string;
	connectedAt: Date;
}

export interface DebugResult {
	success?: boolean;
	error?: boolean;
	result?: any;
	msg?: string;
	stack?: string;
	timestamp?: string;
}

export interface ExecCommand {
	cmd: string;
	desc: string;
}

class SocketServer {
	private io: SocketIOServer;
	private httpServer: HttpServer;
	private currentSocket: Socket | null = null;

	constructor(port: number = 7890) {
		this.httpServer = createServer();
		this.io = new SocketIOServer(this.httpServer, {
			cors: {
				origin: true,
				methods: ["GET", "POST"],
				allowedHeaders: ["ngrok-skip-browser-warning"],
				credentials: true,
			},
		});

		this.setupSocketHandlers();
		this.startServer(port);
	}

	private setupSocketHandlers(): void {
		this.io.on("connection", (socket: Socket) => {
			console.log(`\n✅ 客户端已连接: ${socket.id}`);
			this.currentSocket = socket;

			// Handle debug results
			socket.on("debug_result", (result: DebugResult) => {
				console.log("\n📤 收到调试结果：");
				console.log(JSON.stringify(result, null, 2));
			});

			// Handle disconnection
			socket.on("disconnect", (reason: string) => {
				console.log(`\n❌ 客户端断开连接: ${socket.id} (${reason})`);
				if (this.currentSocket === socket) {
					this.currentSocket = null;
				}
			});
		});
	}

	private startServer(port: number): void {
		this.httpServer.listen(port, () => {
			console.log(`🚀 Socket.IO服务器已启动，监听端口：${port}`);
			console.log("💡 等待客户端连接...");
		});
	}

	public sendCommand(socketId: string, command: ExecCommand): boolean {
		const socket = this.io.sockets.sockets.get(socketId);
		if (socket) {
			socket.emit("exec_command", command);
			return true;
		}
		return false;
	}

	public sendCommandToCurrent(command: ExecCommand): boolean {
		if (this.currentSocket) {
			this.currentSocket.emit("exec_command", command);
			return true;
		}
		return false;
	}

	public getCurrentSocket(): Socket | null {
		return this.currentSocket;
	}

	public onClientConnect(callback: (client: ClientInfo) => void): void {
		this.io.on("connection", (socket: Socket) => {
			socket.on("client_info", (data: { url: string; ua: string; title: string }) => {
				const clientInfo: ClientInfo = {
					id: socket.id,
					url: data.url,
					ua: data.ua,
					title: data.title,
					connectedAt: new Date(),
				};
				callback(clientInfo);
			});
		});
	}

	public onClientDisconnect(callback: (socketId: string) => void): void {
		this.io.on("connection", (socket: Socket) => {
			socket.on("disconnect", () => {
				callback(socket.id);
			});
		});
	}
}

export default SocketServer;
