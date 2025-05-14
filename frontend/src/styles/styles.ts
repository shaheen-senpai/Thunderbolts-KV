import styled, { createGlobalStyle } from "styled-components";

// Global styles
export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  
  body {
    font-family:Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    background-color: #343541;
    color: rgba(255, 255, 255, 0.9);
    line-height: 1.5;
  }
  
  /* Scrollbar styling */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  
  ::-webkit-scrollbar-track {
    background: transparent;
  }
  
  ::-webkit-scrollbar-thumb {
    background: #565869;
    border-radius: 4px;
  }
  
  ::-webkit-scrollbar-thumb:hover {
    background: #676979;
  }
`;

// Main layout components
export const AppContainer = styled.div`
	display: flex;
	height: 100vh;
`;

export const Sidebar = styled.div`
	width: 260px;
	background-color: #202123;
	display: flex;
	flex-direction: column;

@media (max-width: 768px) {
		display: none;
	}
`;

export const SidebarHeader = styled.div`
	padding: 12px;
	border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

export const NewChatButton = styled.button`
	width: 100%;
	background-color: transparent;
	border: 1px solid rgba(255, 255, 255, 0.2);
	border-radius: 4px;
	color: rgba(255, 255, 255, 0.9);
	padding: 12px;
	display: flex;
	align-items: center;
	gap: 12px;
	cursor: pointer;
	transition: background-color 0.2s;
	font-size: 14px;

	&:hover {
		background-color: rgba(255, 255, 255, 0.1);
	}
`;

export const SidebarConversations = styled.div`
	flex: 1;
	overflow-y: auto;
	padding: 8px;
`;

export const ConversationItem = styled.div<{ active?: boolean }>`
	padding: 12px;
	border-radius: 4px;
	cursor: pointer;
	transition: background-color 0.2s;
	margin-bottom: 4px;
	display: flex;
	align-items: center;
	gap: 8px;
	font-size: 14px;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;

	background-color: ${(props) => (props.active ? "rgba(255, 255, 255, 0.1)" : "transparent")};

	&:hover {
		background-color: rgba(255, 255, 255, 0.1);
	}
`;

export const SidebarFooter = styled.div`
	padding: 12px;
	border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

export const MainContent = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
	background-color: #343541;
	position: relative;
`;

export const ChatContainer = styled.div`
	flex: 1;
	overflow-y: auto;
	padding: 0;
	scroll-behavior: smooth;
`;

export const WelcomeContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 100%;
	padding: 0 20px;
	text-align: center;
	background-color:#202123;
 
`;

export const WelcomeTitle = styled.h1`
	font-size: 2rem;
	margin-bottom: 24px;
	color: rgba(255, 255, 255, 0.9);
`;

export const WelcomeSubtitle = styled.p`
	font-size: 1rem;
	color: rgba(255, 255, 255, 0.7);
	max-width: 600px;
	margin-bottom: 32px;
`;
export const ExampleContainer = styled.div`
	display: flex;
	gap: 16px;
	flex-wrap: wrap;
	justify-content: center;
	max-width: 900px;
`;

export const ExampleCard = styled.div`
	background-color: #303030;
	border-radius: 8px;
	padding: 16px;
	width: 280px;
	cursor: pointer;
	transition: background-color 0.2s;

	&:hover {
		background-color: #565869;
	}
`;

export const ExampleTitle = styled.div`
	font-weight: 600;
	margin-bottom: 8px;
`;

export const ExampleText = styled.div`
	font-size: 0.9rem;
	color: rgba(255, 255, 255, 0.7);
`;

// Message components
export const MessageRow = styled.div<{ isUser?: boolean }>`
	display: flex;
	padding: 24px;
	border-bottom: 1px solid ${(props) => (props.isUser ? "rgba(255, 255, 255, 0.1)" : "#444654")};
	background-color: ${(props) => (props.isUser ? "#343541" : "#444654")};
`;

export const MessageContainer = styled.div`
	max-width: 800px;
	margin: 0 auto;
	display: flex;
	width: 100%;
	gap: 24px;
`;

export const MessageAvatar = styled.div<{ isUser?: boolean }>`
	width: 30px;
	height: 30px;
	border-radius: 2px;
	background-color: ${(props) => (props.isUser ? "#10a37f" : "#7e22ce")};
	display: flex;
	align-items: center;
	justify-content: center;
	flex-shrink: 0;
	color: white;
	font-weight: bold;
`;

export const MessageContent = styled.div`
	flex: 1;
	line-height: 1.6;

	p,
	ul,
	ol,
	pre {
		margin-bottom: 16px;
	}

	pre {
		background-color: #282a36;
		padding: 12px;
		border-radius: 4px;
		overflow-x: auto;
	}

	code {
		font-family: "Söhne Mono", Monaco, "Andale Mono", "Ubuntu Mono", monospace;
		font-size: 0.9em;
	}

	p code {
		background-color: rgba(0, 0, 0, 0.2);
		padding: 2px 4px;
		border-radius: 3px;
	}

	ul,
	ol {
		padding-left: 24px;
	}
`;

export const InputContainer = styled.div`
	position: sticky;
	bottom: 0;
	padding: 16px;
	background-color: #343541;
	border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

export const InputWrapper = styled.div`
	max-width: 800px;
	margin: 0 auto;
	position: relative;
`;

export const TextArea = styled.textarea`
	width: 100%;
	padding: 16px 48px 16px 16px;
	border-radius: 8px;
	border: 1px solid rgba(255, 255, 255, 0.2);
	background-color: rgba(64, 65, 79, 1);
	color: rgba(255, 255, 255, 0.9);
	font-family: inherit;
	font-size: 1rem;
	resize: none;
	min-height: 56px;
	max-height: 200px;
	outline: none;
	transition: border-color 0.2s;
	box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);

	&:focus {
		border-color: rgba(255, 255, 255, 0.4);
	}

	&::placeholder {
		color: rgba(255, 255, 255, 0.5);
	}
`;

export const SendButton = styled.button`
	position: absolute;
	right: 12px;
	bottom: 12px;
	margin-bottom: 8px;
	width: 32px;
	height: 32px;
	border-radius: 4px;
	background-color: #10a37f;
	border: none;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	color: white;
	transition: background-color 0.2s;

	&:hover {
		background-color: #0d8c6d;
	}

	&:disabled {
		background-color: rgba(16, 163, 127, 0.5);
		cursor: not-allowed;
	}
`;

export const RegenerateButton = styled.button`
	padding: 10px 16px;
	border-radius: 4px;
	border: 1px solid rgba(255, 255, 255, 0.2);
	background-color: transparent;
	color: rgba(255, 255, 255, 0.9);
	font-size: 14px;
	cursor: pointer;
	transition: background-color 0.2s;
	display: flex;
	align-items: center;
	gap: 8px;
	margin: 0 auto;

	&:hover {
		background-color: rgba(255, 255, 255, 0.1);
	}
`;

export const LoadingDots = styled.div`
	display: flex;
	gap: 4px;
	align-items: center;
	padding: 0 24px;
	margin: 16px 0;

	span {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background-color: rgba(255, 255, 255, 0.7);
		animation: pulse 1.5s infinite ease-in-out;

		&:nth-child(2) {
			animation-delay: 0.2s;
		}

		&:nth-child(3) {
			animation-delay: 0.4s;
		}
	}

	@keyframes pulse {
		0%,
		100% {
			opacity: 0.4;
		}
		50% {
			opacity: 1;
		}
	}
`;
