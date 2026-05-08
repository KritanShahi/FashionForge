import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const FAQS = [
  "How many Products are There?",
  "Cheapest product",
  "Most expensive product",
  "Go to cart",
];

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
  const navigate = useNavigate();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (msg) => {
    if (!msg.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: msg,
      sender: 'user'
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/chat`,
        { message: msg, history: messages }
      );

      const botMessage = {
        id: Date.now() + 1,
        text: response.data.reply || "Sorry, I couldn't understand that.",
        sender: 'bot',
      };

      setMessages(prev => [...prev, botMessage]);

      if (response.data.action === "navigate_cart") {
        setTimeout(() => navigate("/cart"), 500);
      }

      if (response.data.action === "navigate_products") {
        setTimeout(() => navigate("/products"), 500);
      }

      if (response.data.action === "navigate_orders") {
        setTimeout(() => navigate("/orders"), 500);
      }

      if (response.data.action === "navigate_product" && response.data.productId) {
        setTimeout(() => navigate(`/product/${response.data.productId}`), 500);
      }

    } catch (err) {
      setMessages(prev => [...prev, {
        id: Date.now() + 2,
        text: "Server error. Try again.",
        sender: 'bot'
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
    
      <ChatIconButton onClick={() => setIsOpen(!isOpen)}>
        <ChatIcon />
      </ChatIconButton>

  
      <AnimatePresence>
        {isOpen && (
          <ChatContainer
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
          >

            <ChatHeader>
              <HeaderLeft>
                <ChatIcon />
                <div>
                  <h4>Fashion Assistant</h4>
                  <span>Online</span>
                </div>
              </HeaderLeft>

              <CloseButton onClick={() => setIsOpen(false)}>
                <CloseIcon />
              </CloseButton>
            </ChatHeader>

           
            <FAQContainer>
              {FAQS.map((f, i) => (
                <FAQButton key={i} onClick={() => sendMessage(f)}>
                  {f}
                </FAQButton>
              ))}
            </FAQContainer>

    
            <Messages>
              {messages.map(m => (
                <Bubble key={m.id} $user={m.sender === 'user'}>
                  {m.text}
                </Bubble>
              ))}

              {isTyping && <Typing>Typing...</Typing>}

              <div ref={messagesEndRef} />
            </Messages>

            {/* INPUT */}
            <InputBox>
              <input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage(inputMessage)}
                placeholder="Type message..."
              />

              <button onClick={() => sendMessage(inputMessage)}>
                <SendIcon />
              </button>
            </InputBox>

          </ChatContainer>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;


const ChatIconButton = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;

  width: 56px;
  height: 56px;

  border-radius: 50%;
  border: none;

  background: linear-gradient(135deg,#667eea,#764ba2);
  color: white;

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;

  z-index: 999999; 
`;
const ChatContainer = styled(motion.div)`
  position: fixed;
  bottom: 90px;
  right: 20px;

  width: 360px;
  height: 520px;

  background: white;
  border-radius: 16px;

  display: flex;
  flex-direction: column;

  overflow: hidden;

  box-shadow: 0 10px 25px rgba(0,0,0,0.25);

  z-index: 999999;   

  @media (max-width: 768px) {
    width: calc(100vw - 20px);
    height: 80vh;
    right: 10px;
    bottom: 10px;
  }

  @media (max-width: 480px) {
    width: 100vw;
    height: 100vh;
    right: 0;
    bottom: 0;
    border-radius: 0;
  }
`;
const ChatHeader = styled.div`
  padding: 12px;
  background: linear-gradient(135deg,#667eea,#764ba2);
  color: white;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HeaderLeft = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;

  h4 {
    margin: 0;
    font-size: 14px;
  }

  span {
    font-size: 11px;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
`;

const FAQContainer = styled.div`
  display: flex;
  overflow-x: auto;
  gap: 8px;
  padding: 8px;
`;

const FAQButton = styled.button`
  white-space: nowrap;
  border: none;
  padding: 6px 10px;
  border-radius: 20px;
  font-size: 12px;
  background: #f1f1f1;
  cursor: pointer;
`;

const Messages = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 10px;
`;

const Bubble = styled.div`
  max-width: 80%;
  margin: 5px 0;
  padding: 10px;
  border-radius: 12px;

  background: ${({ $user }) => ($user ? '#667eea' : '#eee')};
  color: ${({ $user }) => ($user ? 'white' : 'black')};

  margin-left: ${({ $user }) => ($user ? 'auto' : '0')};
`;

const Typing = styled.div`
  font-size: 12px;
  opacity: 0.6;
`;

const InputBox = styled.div`
  display: flex;
  padding: 8px;
  border-top: 1px solid #ddd;

  input {
    flex: 1;
    border: none;
    outline: none;
    padding: 8px;
  }

  button {
    border: none;
    background: #667eea;
    color: white;
    padding: 8px;
    border-radius: 8px;
  }
`;