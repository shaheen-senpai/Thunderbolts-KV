import React, { useState, useRef, useEffect } from "react";
import { FiSend } from "react-icons/fi";
import { InputContainer, InputWrapper, TextArea, SendButton } from "../styles/styles";

interface ChatInputProps {
	onSendMessage: (message: string) => void;
	isLoading: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading }) => {
	const [message, setMessage] = useState("");
	const textAreaRef = useRef<HTMLTextAreaElement>(null);

	useEffect(() => {
		adjustTextAreaHeight();
	}, [message]);

	const adjustTextAreaHeight = () => {
		const textArea = textAreaRef.current;
		if (textArea) {
			textArea.style.height = "auto";
			textArea.style.height = `${Math.min(textArea.scrollHeight, 200)}px`;
		}
	};

	const handleSendMessage = () => {
		if (message.trim() && !isLoading) {
			onSendMessage(message);
			setMessage("");

			// Reset height after sending
			if (textAreaRef.current) {
				textAreaRef.current.style.height = "auto";
			}
		}
	};

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			handleSendMessage();
		}
	};

	return (
		<InputContainer>
			<InputWrapper>
				<TextArea
					ref={textAreaRef}
					value={message}
					onChange={(e) => setMessage(e.target.value)}
					onKeyDown={handleKeyDown}
					placeholder="Send a message..."
					rows={1}
					disabled={isLoading}
				/>
				<SendButton onClick={handleSendMessage} disabled={!message.trim() || isLoading}>
					▶
				</SendButton>
			</InputWrapper>
		</InputContainer>
	);
};

export default ChatInput;
