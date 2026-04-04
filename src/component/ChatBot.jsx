import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi! I'm your fashion assistant. How can I help you today?", sender: 'bot' }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (inputMessage.trim() === '') return;

    const newMessage = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user'
    };

    setMessages([...messages, newMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        text: getBotResponse(inputMessage),
        sender: 'bot'
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const getBotResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      return "Hello! Welcome to Fashion Forge! How can I assist you with your fashion needs today?";
    } else if (lowerMessage.includes('product') || lowerMessage.includes('item')) {
      return "We have a wide range of fashion products including clothing, accessories, and more. You can browse our collection on the main page!";
    } else if (lowerMessage.includes('price') || lowerMessage.includes('cost')) {
      return "Our products range from Rs 500 to Rs 5000. We offer competitive prices and frequent discounts!";
    } else if (lowerMessage.includes('shipping') || lowerMessage.includes('delivery')) {
      return "We offer free shipping on orders above Rs 500! Standard delivery takes 3-5 business days.";
    } else if (lowerMessage.includes('return') || lowerMessage.includes('refund')) {
      return "We have a 30-day return policy. Items must be unused and in original condition.";
    } else if (lowerMessage.includes('size') || lowerMessage.includes('fit')) {
      return "We offer sizes from XS to XXL. You can check the size guide on each product page for detailed measurements.";
    } else {
      return "Thank you for your message! Our team is here to help. For specific inquiries about products, orders, or services, please let me know more details.";
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      <ChatIconButton
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: 0.5 }}
      >
        <ChatIcon />
      </ChatIconButton>

      <AnimatePresence>
        {isOpen && (
          <ChatContainer
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.8 }}
            transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
          >
            <ChatHeader>
              <HeaderContent>
                <Avatar>
                  <ChatIcon />
                </Avatar>
                <HeaderText>
                  <HeaderTitle>Fashion Assistant</HeaderTitle>
                  <HeaderStatus>Online</HeaderStatus>
                </HeaderText>
              </HeaderContent>
              <CloseButton onClick={() => setIsOpen(false)}>
                <CloseIcon />
              </CloseButton>
            </ChatHeader>

            <MessagesContainer>
              {messages.map((message) => (
                <MessageBubble
                  key={message.id}
                  sender={message.sender}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {message.text}
                </MessageBubble>
              ))}
              
              {isTyping && (
                <TypingIndicator>
                  <TypingDot />
                  <TypingDot />
                  <TypingDot />
                </TypingIndicator>
              )}
              <div ref={messagesEndRef} />
            </MessagesContainer>

            <InputContainer>
              <MessageInput
                type="text"
                placeholder="Type your message..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <SendButton onClick={handleSendMessage}>
                <SendIcon />
              </SendButton>
            </InputContainer>
          </ChatContainer>
        )}
      </AnimatePresence>
    </>
  );
};

// Animations
const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
`;

const typing = keyframes`
  0%, 60%, 100% {
    transform: translateY(0);
  }
  30% {
    transform: translateY(-10px);
  }
`;

// Styled Components
const ChatIconButton = styled(motion.button)`
  position: fixed;
  bottom: 30px;
  left: 30px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  color: white;
  cursor: pointer;
  box-shadow: 0 4px 20px rgba(102, 126, 234, 0.4);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 6px 30px rgba(102, 126, 234, 0.6);
    animation: ${pulse} 2s infinite;
  }

  svg {
    font-size: 28px;
  }
`;

const ChatContainer = styled(motion.div)`
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 380px;
  height: 500px;
  background: white;
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid #e1e8ed;
`;

const ChatHeader = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Avatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const HeaderText = styled.div``;

const HeaderTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 2px;
`;

const HeaderStatus = styled.div`
  font-size: 12px;
  opacity: 0.9;
  display: flex;
  align-items: center;
  gap: 5px;

  &::before {
    content: '';
    width: 8px;
    height: 8px;
    background: #4ade80;
    border-radius: 50%;
    animation: ${pulse} 2s infinite;
  }
`;

const CloseButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`;

const MessagesContainer = styled.div`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
  background: #f8fafc;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  &::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 3px;
  }
`;

const MessageBubble = styled(motion.div)`
  max-width: 80%;
  padding: 12px 16px;
  border-radius: 18px;
  font-size: 14px;
  line-height: 1.4;
  word-wrap: break-word;
  
  ${props => props.sender === 'user' ? `
    align-self: flex-end;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border-bottom-right-radius: 4px;
  ` : `
    align-self: flex-start;
    background: white;
    color: #333;
    border: 1px solid #e1e8ed;
    border-bottom-left-radius: 4px;
  `}
`;

const TypingIndicator = styled.div`
  display: flex;
  gap: 4px;
  align-self: flex-start;
  padding: 12px 16px;
  background: white;
  border: 1px solid #e1e8ed;
  border-radius: 18px;
  border-bottom-left-radius: 4px;
`;

const TypingDot = styled.div`
  width: 8px;
  height: 8px;
  background: #667eea;
  border-radius: 50%;
  animation: ${typing} 1.4s infinite;
  
  &:nth-child(2) {
    animation-delay: 0.2s;
  }
  
  &:nth-child(3) {
    animation-delay: 0.4s;
  }
`;

const InputContainer = styled.div`
  padding: 20px;
  background: white;
  border-top: 1px solid #e1e8ed;
  display: flex;
  gap: 12px;
`;

const MessageInput = styled.input`
  flex: 1;
  padding: 12px 16px;
  border: 1px solid #e1e8ed;
  border-radius: 25px;
  outline: none;
  font-size: 14px;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #667eea;
  }
`;

const SendButton = styled.button`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }

  svg {
    font-size: 20px;
  }
`;

export default ChatBot;
