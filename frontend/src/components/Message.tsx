import React from "react";
import ReactMarkdown from "react-markdown";
import { FaUser } from "react-icons/fa";
import { RiRobot2Fill } from "react-icons/ri";
import { MessageRow, MessageContainer, MessageAvatar, MessageContent } from "../styles/styles";
import { formatMarkdown } from "../utils/markdown";

interface MessageProps {
	role: "user" | "assistant";
	content: string;
}

const Message: React.FC<MessageProps> = ({ role, content }) => {
	const isUser = role === "user";

	return (
		<MessageRow isUser={isUser}>
			<MessageContainer>
				<MessageAvatar isUser={isUser}>{isUser ? "U" : "AI"}</MessageAvatar>
				<MessageContent>{isUser ? <p>{content}</p> : <ReactMarkdown>{formatMarkdown(content)}</ReactMarkdown>}</MessageContent>
			</MessageContainer>
		</MessageRow>
	);
};

export default Message;
