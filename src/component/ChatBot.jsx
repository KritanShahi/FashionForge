import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
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

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => { scrollToBottom(); }, [messages]);

  const sendMessage = async (msg) => {
    if (!msg.trim()) return;

    const userMessage = { id: messages.length + 1, text: msg, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/chat`, {
        message: msg,
        history: messages
      });

      const botMessage = {
        id: messages.length + 2,
        text: response.data.reply || "Sorry, I couldn't understand that.",
        sender: 'bot',
      };

      setMessages(prev => [...prev, botMessage]);

      // NAVIGATION ACTIONS
      if (response.data.action === "navigate_cart") setTimeout(() => navigate("/cart"), 800);
      if (response.data.action === "navigate_products") setTimeout(() => navigate("/products"), 800);
      if (response.data.action === "navigate_orders") setTimeout(() => navigate("/orders"), 800);
      if (response.data.action === "navigate_product" && response.data.productId)
        setTimeout(() => navigate(`/product/${response.data.productId}`), 800);

    } catch (error) {
      console.error('Error fetching bot response:', error);
      const botMessage = {
        id: messages.length + 2,
        text: "Sorry, I'm having trouble right now. Please try again later.",
        sender: 'bot',
      };
      setMessages(prev => [...prev, botMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSendMessage = () => sendMessage(inputMessage);
  const handleKeyPress = (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSendMessage(); } };

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
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.8 }}
          >

            <ChatHeader>
              <HeaderContent>
                <Avatar><ChatIcon /></Avatar>
                <HeaderText>
                  <HeaderTitle>Fashion Assistant</HeaderTitle>
                  <HeaderStatus>Online</HeaderStatus>
                </HeaderText>
              </HeaderContent>
              <CloseButton onClick={() => setIsOpen(false)}><CloseIcon /></CloseButton>
            </ChatHeader>

            {/* ================= FAQ BUTTONS ================= */}
            <FAQContainer>
              {FAQS.map((faq, idx) => (
                <FAQButton key={idx} onClick={() => sendMessage(faq)}>
                  {faq}
                </FAQButton>
              ))}
            </FAQContainer>

            <MessagesContainer>
              {messages.map(msg => (
                <MessageBubble key={msg.id} sender={msg.sender}>
                  {msg.text}
                </MessageBubble>
              ))}
              {isTyping && <TypingIndicator><TypingDot /><TypingDot /><TypingDot /></TypingIndicator>}
              <div ref={messagesEndRef} />
            </MessagesContainer>

            <InputContainer>
              <MessageInput
                type="text"
                placeholder="Type your message..."
                value={inputMessage}
                onChange={e => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <SendButton onClick={handleSendMessage}><SendIcon /></SendButton>
            </InputContainer>

          </ChatContainer>
        )}
      </AnimatePresence>
    </>
  );
};

// ================= ANIMATIONS =================
const typing = keyframes`
  0%, 60%, 100% { transform: translateY(0); }
  30% { transform: translateY(-5px); }
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
  width: 450px;
  height: 650px;
  background: white;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 12px 30px rgba(0,0,0,0.25);
`;

const ChatHeader = styled.div`
  background: linear-gradient(135deg,#667eea,#764ba2);
  color: white;
  padding: 20px;
  display: flex;
  justify-content: space-between;
`;

const HeaderContent = styled.div` display:flex; align-items:center; gap:12px; `;
const Avatar = styled.div` width:40px; height:40px; border-radius:50%; background:rgba(255,255,255,0.2); display:flex; align-items:center; justify-content:center; `;
const HeaderText = styled.div``;
const HeaderTitle = styled.div` font-size:16px; font-weight:600; `;
const HeaderStatus = styled.div` font-size:12px; `;
const CloseButton = styled.button` background:none; border:none; color:white; cursor:pointer; `;

const MessagesContainer = styled.div`
  flex:1;
  padding:20px;
  overflow-y:auto;
  display:flex;
  flex-direction:column;
  gap:12px;
`;

const MessageBubble = styled.div`
  max-width:75%;
  padding:12px 16px;
  border-radius:20px;
  font-size:15px;
  word-wrap: break-word;
  ${props => props.sender === 'user'
    ? `align-self:flex-end; background:#667eea; color:white;`
    : `align-self:flex-start; background:#f1f3f6; color:black;`}
`;

const TypingIndicator = styled.div` display:flex; gap:4px; `;
const TypingDot = styled.div`
  width:6px;
  height:6px;
  background:#667eea;
  border-radius:50%;
  animation:${typing} 1.2s infinite;
`;

const InputContainer = styled.div`
  padding:18px;
  border-top:1px solid #e1e8ed;
  display:flex;
  gap:12px;
`;

const MessageInput = styled.input`
  flex:1;
  padding:12px;
  border-radius:25px;
  border:1px solid #e1e8ed;
  font-size:14px;
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

// ================= FAQ BUTTONS =================
const FAQContainer = styled.div`
  display:flex;
  gap:8px;
  padding:10px 15px;
  overflow-x:auto;
`;

const FAQButton = styled.button`
  background:#f1f3f6;
  border:none;
  border-radius:22px;
  padding:8px 14px;
  cursor:pointer;
  font-size:13px;
  white-space:nowrap;
  &:hover { background:#e0e4ea; }
`;

export default ChatBot;