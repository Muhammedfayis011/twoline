import { useState } from 'react';
import './TwoLineAssistant.css';
import { useLanguage } from '../../context/LanguageContext';

export default function TwoLineAssistant() {
  const { isAr } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', text: isAr ? 'مرحباً! أنا مستشار الذكاء الاصطناعي لتو لاين. كيف يمكنني مساعدتك في اختيار الأثاث المثالي اليوم؟' : 'Hello! I am the Two Line Design Assistant. How can I help you pick the perfect furniture today?' }
  ]);
  const [input, setInput] = useState('');

  const toggleChat = () => setIsOpen(!isOpen);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const newMessages = [...messages, { role: 'user', text: input }];
    setMessages(newMessages);
    setInput('');

    // Simulate AI response
    setTimeout(() => {
      setMessages([...newMessages, { 
        role: 'assistant', 
        text: isAr ? 'شكراً لرسالتك! أحد خبرائنا (أو ميزة الذكاء الاصطناعي الكاملة) سيرد قريباً.' : 'Thanks for reaching out! One of our experts (or the full AI backend) will respond shortly.' 
      }]);
    }, 1000);
  };

  return (
    <div className={`apollo-assistant-wrapper ${isAr ? 'rtl' : 'ltr'}`}>
      {/* Floating Button */}
      <button 
        className="apollo-float-btn"
        onClick={toggleChat}
        aria-label="Toggle Two Line Assistant"
      >
        <span className="apollo-icon">✨</span>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="apollo-chat-window">
          <div className="apollo-chat-header">
            <div className="apollo-header-title">
              <span className="apollo-icon">✨</span>
              <div>
                <strong>{isAr ? 'مساعد تو لاين' : 'Two Line Assistant'}</strong>
                <div style={{ fontSize: '0.75rem', opacity: 0.8 }}>{isAr ? 'متصل دائماً' : 'Always Online'}</div>
              </div>
            </div>
            <button className="apollo-close-btn" onClick={toggleChat}>✕</button>
          </div>
          
          <div className="apollo-chat-body">
            {messages.map((msg, idx) => (
              <div key={idx} className={`apollo-msg-row ${msg.role}`}>
                <div className="apollo-bubble">
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          <form className="apollo-chat-footer" onSubmit={handleSend}>
            <input 
              type="text" 
              placeholder={isAr ? 'اكتب رسالتك...' : 'Type your message...'} 
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit" className="apollo-send-btn">
              {isAr ? 'إرسال' : 'Send'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
