import axios from "axios";

const API_URL = "http://localhost:5001/api";

export interface Message {
	role: "user" | "assistant" | "system";
	content: string;
}

export const sendMessage = async (messages: Message[], agent: "gemini" | "claude"): Promise<Message> => {
	try {
		const response = await axios.post(`${API_URL}/chat`, { messages, agent });
		return response.data;
	} catch (error) {
		console.error("Error sending message:", error);
		throw error;
	}
};

export const sendMessageStream = async (
	messages: Message[],
	agent: "gemini" | "claude",
	onChunk: (chunk: string) => void,
	onDone: () => void
): Promise<void> => {
	try {
		const response = await fetch(`${API_URL}/chat/stream`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ messages, agent }),
		});

		if (!response.body) {
			throw new Error("Response body is null");
		}

		const reader = response.body.getReader();
		const decoder = new TextDecoder();

		let done = false;

		while (!done) {
			const { value, done: readerDone } = await reader.read();
			done = readerDone;

			if (done) {
				onDone();
				break;
			}

			const text = decoder.decode(value);
			const lines = text.split("\n\n");

			for (const line of lines) {
				if (line.startsWith("data: ")) {
					const data = line.slice(6);

					if (data === "[DONE]") {
						onDone();
					} else {
						try {
							const parsed = JSON.parse(data);
							if (parsed.content) {
								onChunk(parsed.content);
							}
						} catch (e) {
							console.error("Error parsing SSE data:", e);
						}
					}
				}
			}
		}
	} catch (error) {
		console.error("Error in stream:", error);
		throw error;
	}
};
