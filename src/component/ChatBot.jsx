import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // ⭐ NEW

const ChatBot = () => {

  const [isOpen, setIsOpen] = useState(false);

  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm your fashion assistant. How can I help you today?",
      sender: 'bot'
    }
  ]);

  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef(null);

  const navigate = useNavigate(); // ⭐ NEW

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth"
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // ================= SEND MESSAGE =================

  const handleSendMessage = async () => {

    if (inputMessage.trim() === '') return;

    const userMessage = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user',
    };

    setMessages(prev => [...prev, userMessage]);

    setInputMessage('');
    setIsTyping(true);

    try {

      const response = await axios.post(
        'http://localhost:8080/api/chat',
        {
          message: inputMessage,
          history: messages,
        }
      );

      const botMessage = {
        id: messages.length + 2,
        text:
          response.data.reply ||
          "Sorry, I couldn't understand that.",
        sender: 'bot',
      };

      setMessages(prev => [...prev, botMessage]);

      // ================= NAVIGATION ACTIONS =================

      if (response.data.action === "navigate_cart") {

        setTimeout(() => {
          navigate("/cart");
        }, 800);

      }

      if (response.data.action === "navigate_products") {

        setTimeout(() => {
          navigate("/products");
        }, 800);

      }

      if (response.data.action === "navigate_orders") {

        setTimeout(() => {
          navigate("/orders");
        }, 800);

      }

    } catch (error) {

      console.error(
        'Error fetching bot response:',
        error
      );

      const botMessage = {
        id: messages.length + 2,
        text:
          "Sorry, I'm having trouble right now. Please try again later.",
        sender: 'bot',
      };

      setMessages(prev => [...prev, botMessage]);

    } finally {

      setIsTyping(false);

    }

  };

  // ================= ENTER KEY =================

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
      >
        <ChatIcon />
      </ChatIconButton>

      <AnimatePresence>

        {isOpen && (

          <ChatContainer
            initial={{
              opacity: 0,
              y: 50,
              scale: 0.8
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1
            }}
            exit={{
              opacity: 0,
              y: 50,
              scale: 0.8
            }}
          >

            <ChatHeader>

              <HeaderContent>

                <Avatar>
                  <ChatIcon />
                </Avatar>

                <HeaderText>

                  <HeaderTitle>
                    Fashion Assistant
                  </HeaderTitle>

                  <HeaderStatus>
                    Online
                  </HeaderStatus>

                </HeaderText>

              </HeaderContent>

              <CloseButton
                onClick={() => setIsOpen(false)}
              >
                <CloseIcon />
              </CloseButton>

            </ChatHeader>

            <MessagesContainer>

              {messages.map((message) => (

                <MessageBubble
                  key={message.id}
                  sender={message.sender}
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
                onChange={(e) =>
                  setInputMessage(e.target.value)
                }
                onKeyPress={handleKeyPress}
              />

              <SendButton
                onClick={handleSendMessage}
              >
                <SendIcon />
              </SendButton>

            </InputContainer>

          </ChatContainer>

        )}

      </AnimatePresence>
    </>
  );

};

// ================= ANIMATIONS =================

const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
`;

const typing = keyframes`
  0%, 60%, 100% { transform: translateY(0); }
  30% { transform: translateY(-10px); }
`;

// ================= STYLES =================

const ChatIconButton = styled(motion.button)`
  position: fixed;
  bottom: 30px;
  left: 30px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg,#667eea,#764ba2);
  border: none;
  color: white;
  cursor: pointer;
  z-index: 1000;
`;

const ChatContainer = styled(motion.div)`
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 380px;
  height: 500px;
  background: white;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
`;

const ChatHeader = styled.div`
  background: linear-gradient(135deg,#667eea,#764ba2);
  color: white;
  padding: 20px;
  display: flex;
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
  background: rgba(255,255,255,0.2);
  display:flex;
  align-items:center;
  justify-content:center;
`;

const HeaderText = styled.div``;

const HeaderTitle = styled.div`
  font-size:16px;
  font-weight:600;
`;

const HeaderStatus = styled.div`
  font-size:12px;
`;

const CloseButton = styled.button`
  background:none;
  border:none;
  color:white;
  cursor:pointer;
`;

const MessagesContainer = styled.div`
  flex:1;
  padding:20px;
  overflow-y:auto;
  display:flex;
  flex-direction:column;
  gap:12px;
`;

const MessageBubble = styled.div`
  max-width:80%;
  padding:12px 16px;
  border-radius:18px;
  font-size:14px;

  ${props =>
    props.sender === 'user'
      ? `
    align-self:flex-end;
    background:#667eea;
    color:white;
  `
      : `
    align-self:flex-start;
    background:white;
    border:1px solid #e1e8ed;
  `}
`;

const TypingIndicator = styled.div`
  display:flex;
  gap:4px;
`;

const TypingDot = styled.div`
  width:8px;
  height:8px;
  background:#667eea;
  border-radius:50%;
  animation:${typing} 1.4s infinite;
`;

const InputContainer = styled.div`
  padding:20px;
  border-top:1px solid #e1e8ed;
  display:flex;
  gap:12px;
`;

const MessageInput = styled.input`
  flex:1;
  padding:12px;
  border-radius:25px;
  border:1px solid #e1e8ed;
`;

const SendButton = styled.button`
  width:44px;
  height:44px;
  border-radius:50%;
  background:#667eea;
  color:white;
  border:none;
  cursor:pointer;
`;

export default ChatBot;