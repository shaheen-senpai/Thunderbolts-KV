import React from "react";
import { FiPlus, FiMessageSquare, FiTrash } from "react-icons/fi";
import { Sidebar, SidebarHeader, NewChatButton, SidebarConversations, ConversationItem, SidebarFooter } from "../styles/styles";

interface SidebarProps {
	conversations: Array<{ id: string; title: string }>;
	activeConversation: string | null;
	onNewChat: () => void;
	onSelectConversation: (id: string) => void;
	onDeleteConversation: (id: string) => void;
}

const ChatSidebar: React.FC<SidebarProps> = ({ conversations, activeConversation, onNewChat, onSelectConversation, onDeleteConversation }) => {
	return (
		<Sidebar>
			<SidebarHeader>
				<NewChatButton onClick={onNewChat}>+ New chat</NewChatButton>
			</SidebarHeader>

			<SidebarConversations>
				{conversations.map((conversation) => (
					<ConversationItem
						key={conversation.id}
						active={conversation.id === activeConversation}
						onClick={() => onSelectConversation(conversation.id)}
					>
						<span>💬</span>
						<span>{conversation.title}</span>
						<span
							style={{ marginLeft: "auto", cursor: "pointer" }}
							onClick={(e) => {
								e.stopPropagation();
								onDeleteConversation(conversation.id);
							}}
						>
							🗑️
						</span>
					</ConversationItem>
				))}
			</SidebarConversations>

			<SidebarFooter>
				<div style={{ fontSize: "12px", color: "rgba(255, 255, 255, 0.5)" }}>GeminiGPT - Powered by Google Gemini AI</div>
			</SidebarFooter>
		</Sidebar>
	);
};

export default ChatSidebar;
