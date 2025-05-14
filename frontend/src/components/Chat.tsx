import React, { useRef, useEffect } from "react";
import Message from "./Message";
import { VscRefresh } from "react-icons/vsc";
import { ChatContainer, LoadingDots, RegenerateButton } from "../styles/styles";
import { Message as MessageType } from "../utils/api";

interface ChatProps {
	messages: MessageType[];
	loading: boolean;
	onRegenerate: () => void;
}

const Chat: React.FC<ChatProps> = ({ messages, loading, onRegenerate }) => {
	const bottomRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		scrollToBottom();
	}, [messages, loading]);

	const scrollToBottom = () => {
		bottomRef.current?.scrollIntoView({ behavior: "smooth" });
	};

	return (
		<ChatContainer>
			{messages.length > 0 ? (
				<>
					{messages.map((message, index) => (
						<Message key={index} role={message.role === "system" ? "assistant" : message.role} content={message.content} />
					))}

					{loading && (
						<LoadingDots>
							<span></span>
							<span></span>
							<span></span>
						</LoadingDots>
					)}

					{!loading && messages.length > 0 && messages[messages.length - 1].role === "assistant" && (
						<div style={{ padding: "16px 0", display: "flex", justifyContent: "center" }}>
							<RegenerateButton onClick={onRegenerate}>🔄 Regenerate response</RegenerateButton>
						</div>
					)}

					<div ref={bottomRef} />
				</>
			) : (
				<div style={{ padding: "20px", textAlign: "center", color: "rgba(255, 255, 255, 0.5)" }}>No messages yet. Start a conversation!</div>
			)}
		</ChatContainer>
	);
};

export default Chat;
