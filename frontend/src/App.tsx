import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { GlobalStyle, AppContainer, MainContent } from './styles/styles';
import ChatSidebar from './components/Sidebar';
import Chat from './components/Chat';
import ChatInput from './components/ChatInput';
import Welcome from './components/Welcome';
import { Message, sendMessage } from './utils/api';

function App() {
  const [conversations, setConversations] = useState<Array<{ id: string; title: string }>>([]);
  const [activeConversation, setActiveConversation] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  
  // Load conversations from local storage
  useEffect(() => {
    const savedConversations = localStorage.getItem('conversations');
    if (savedConversations) {
      setConversations(JSON.parse(savedConversations));
    }
    
    const savedActiveConversation = localStorage.getItem('activeConversation');
    if (savedActiveConversation) {
      setActiveConversation(savedActiveConversation);
      
      // Load messages for the active conversation
      const savedMessages = localStorage.getItem(`messages_${savedActiveConversation}`);
      if (savedMessages) {
        setMessages(JSON.parse(savedMessages));
      }
    }
  }, []);
  
  // Save conversations to local storage
  useEffect(() => {
    if (conversations.length > 0) {
      localStorage.setItem('conversations', JSON.stringify(conversations));
    }
    
    if (activeConversation) {
      localStorage.setItem('activeConversation', activeConversation);
      localStorage.setItem(`messages_${activeConversation}`, JSON.stringify(messages));
    }
  }, [conversations, activeConversation, messages]);
  
  const createNewChat = () => {
    const newId = uuidv4();
    const newChat = {
      id: newId,
      title: 'New Chat'
    };
    
    setConversations([newChat, ...conversations]);
    setActiveConversation(newId);
    setMessages([]);
  };
  
  const selectConversation = (id: string) => {
    setActiveConversation(id);
    
    // Load messages for the selected conversation
    const savedMessages = localStorage.getItem(`messages_${id}`);
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    } else {
      setMessages([]);
    }
  };
  
  const deleteConversation = (id: string) => {
    const updatedConversations = conversations.filter(conv => conv.id !== id);
    setConversations(updatedConversations);
    
    // Remove messages from local storage
    localStorage.removeItem(`messages_${id}`);
    
    // If the active conversation is deleted, select another one or clear
    if (activeConversation === id) {
      if (updatedConversations.length > 0) {
        selectConversation(updatedConversations[0].id);
      } else {
        setActiveConversation(null);
        setMessages([]);
      }
    }
  };
  
  const updateConversationTitle = (id: string, firstUserMessage: string) => {
    const title = firstUserMessage.length > 30
      ? `${firstUserMessage.substring(0, 30)}...`
      : firstUserMessage;
    
    setConversations(prev => 
      prev.map(conv => 
        conv.id === id ? { ...conv, title } : conv
      )
    );
  };
  
  const handleSendMessage = async (content: string) => {
    // Create a new conversation if none exists
    if (!activeConversation) {
      createNewChat();
    }
    
    const userMessage: Message = { role: 'user', content };
    const updatedMessages = [...messages, userMessage];
    
    setMessages(updatedMessages);
    setLoading(true);
    
    try {
      // If this is the first message, update the conversation title
      if (messages.length === 0 && activeConversation) {
        updateConversationTitle(activeConversation, content);
      }
      
      // Send the message to the API
      const response = await sendMessage(updatedMessages);
      
      // Add the assistant's response to the messages
      setMessages([...updatedMessages, response]);
    } catch (error) {
      console.error('Error sending message:', error);
      // Add an error message
      setMessages([
        ...updatedMessages,
        { 
          role: 'assistant', 
          content: 'Sorry, I encountered an error. Please try again later.' 
        }
      ]);
    } finally {
      setLoading(false);
    }
  };
  
  const handleRegenerateResponse = async () => {
    // Remove the last assistant message
    const lastUserMessageIndex = messages.map(m => m.role).lastIndexOf('user');
    if (lastUserMessageIndex === -1) return;
    
    const messagesToKeep = messages.slice(0, lastUserMessageIndex + 1);
    setMessages(messagesToKeep);
    
    setLoading(true);
    
    try {
      // Re-send the message to get a new response
      const response = await sendMessage(messagesToKeep);
      
      // Add the new assistant response
      setMessages([...messagesToKeep, response]);
    } catch (error) {
      console.error('Error regenerating response:', error);
      setMessages([
        ...messagesToKeep,
        { 
          role: 'assistant', 
          content: 'Sorry, I encountered an error while regenerating the response.' 
        }
      ]);
    } finally {
      setLoading(false);
    }
  };
  
  const handleExampleSelect = (text: string) => {
    handleSendMessage(text);
  };
  
  return (
    <>
      <GlobalStyle />
      <AppContainer>
        <ChatSidebar
          conversations={conversations}
          activeConversation={activeConversation}
          onNewChat={createNewChat}
          onSelectConversation={selectConversation}
          onDeleteConversation={deleteConversation}
        />
        
        <MainContent>
          {activeConversation ? (
            <>
              <Chat
                messages={messages}
                loading={loading}
                onRegenerate={handleRegenerateResponse}
              />
              <ChatInput
                onSendMessage={handleSendMessage}
                isLoading={loading}
              />
            </>
          ) : (
            <Welcome onSelectExample={handleExampleSelect} />
          )}
        </MainContent>
      </AppContainer>
    </>
  );
}

export default App;
