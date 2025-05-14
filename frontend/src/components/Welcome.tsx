import React, { useState } from "react";
import {
  WelcomeContainer,
  WelcomeContent,
  WelcomeTitle,
  WelcomeSubtitle,
  ChatInputWrapper,
  ChatInputBox,
} from "../styles/welcome";

interface WelcomeProps {
  onSelectExample: (text: string) => void;
}

const Welcome: React.FC<WelcomeProps> = ({ onSelectExample }) => {
  const [inputText, setInputText] = useState("");

  const handleSubmit = () => {
    if (inputText.trim()) {
      onSelectExample(inputText);
      setInputText("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <WelcomeContainer>
      <WelcomeContent>
        <WelcomeTitle>What can I help you with?</WelcomeTitle>
        <WelcomeSubtitle>
          A ChatGPT-like interface powered by AI.
          Type your question below to get started.
        </WelcomeSubtitle>

        <ChatInputWrapper>
          <ChatInputBox
            placeholder="Ask Anything"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </ChatInputWrapper>
      </WelcomeContent>
    </WelcomeContainer>
  );
};

export default Welcome;
