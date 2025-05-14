import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    background-color: #343541;
    color: rgba(255, 255, 255, 0.9);
    line-height: 1.5;
  }

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

export const WelcomeContainer = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #202123;
  padding: 20px;
`;

export const WelcomeContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 720px;
  margin-right: 250px;
`;

export const WelcomeTitle = styled.h1`
  font-size: 2rem;
  margin-bottom: 16px;
  color: rgba(255, 255, 255, 0.9);
  text-align: center;
`;

export const WelcomeSubtitle = styled.p`
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.7);
  max-width: 600px;
  text-align: center;
  margin-bottom: 32px;
`;

export const ChatInputWrapper = styled.div`
display: flex;
flex-direction: row;
  justify-content: center;
  width: 100%;
  display: flex;
  align-items: center;
  background: #40414f;
  padding: 12px 16px;
  border-radius: 10px;
`;

export const ChatInputBox = styled.textarea`
  flex: 1;
  resize: none;
  height: 40px;
  padding: 10px 12px;
  font-size: 16px;
  font-family: inherit;
  background-color: transparent;
  color: white;
  border: none;
  outline: none;

  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
    font-family: inherit;
  }
`;
