import React, { useState } from 'react';
import '../../public/Chatbox.css';
const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hey! I’m Liv, your virtual stay assistant 🏡 How can I help you today?' },
  ]);

  const handleSend = () => {
    if (!input.trim()) return;

    setMessages([
      ...messages,
      { sender: 'user', text: input },
      { sender: 'bot', text: "This is just a demo, but I'm happy to chat with you! 😊" },
    ]);
    setInput('');
  };

  return (
    <>
      <div className="chatbot-float-btn" onClick={() => setIsOpen(!isOpen)}>
       <i class="fa-solid fa-paper-plane text-xl"></i>
      </div>

      {isOpen && (
        <div className="chatbot-box">
          <div className="chatbot-header">
            <h4>Need Help?</h4>
            <span onClick={() => setIsOpen(false)}>&times;</span>
          </div>
          <div className="chatbot-body">
            {messages.map((msg, i) => (
              <div key={i} className={`msg ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
          </div>
          <div className="chatbot-footer">
            <input
              type="text"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <button onClick={handleSend}>Send</button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;