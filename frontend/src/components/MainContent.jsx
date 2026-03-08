import React, { useState, useEffect } from 'react';
import { FiUser, FiChevronDown, FiSettings, FiLogOut, FiSend } from 'react-icons/fi';

const MainContent = ({ isSidebarOpen, onUpdateChats, chats, onSelectChat }) => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [currentChatId, setCurrentChatId] = useState(null);

  // Load chat when selected from sidebar
  useEffect(() => {
    if (currentChatId) {
      const selectedChat = chats.find(chat => chat.id === currentChatId);
      if (selectedChat) {
        setMessages(selectedChat.messages || []);
      }
    }
  }, [currentChatId, chats]);

  // Update chats in parent component when messages change
  useEffect(() => {
    if (messages.length > 0 && currentChatId) {
      const updatedChats = chats.map(chat => 
        chat.id === currentChatId 
          ? { 
              ...chat, 
              messages, 
              lastUpdated: Date.now(),
              preview: messages[0]?.text 
            }
          : chat
      );
      onUpdateChats(updatedChats);
    } else if (messages.length > 0 && !currentChatId) {
      // Create new chat
      const newChat = {
        id: Date.now(),
        title: messages[0]?.text.substring(0, 30) + '...',
        messages: messages,
        timestamp: Date.now(),
        lastUpdated: Date.now()
      };
      const updatedChats = [newChat, ...chats];
      onUpdateChats(updatedChats);
      setCurrentChatId(newChat.id);
      onSelectChat(newChat.id);
    }
  }, [messages, currentChatId, chats, onUpdateChats, onSelectChat]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      // Add user message
      const userMessage = {
        id: Date.now(),
        text: message,
        sender: 'user',
        timestamp: new Date().toLocaleTimeString()
      };
      
      const updatedMessages = [...messages, userMessage];
      setMessages(updatedMessages);
      setMessage('');
      
      // Show typing indicator
      setIsTyping(true);
      
      // Simulate AI response after delay
      setTimeout(() => {
        const aiResponse = {
          id: Date.now() + 1,
          text: "This is a simulated response. Your message was: " + message,
          sender: 'ai',
          timestamp: new Date().toLocaleTimeString()
        };
        setMessages(prev => [...prev, aiResponse]);
        setIsTyping(false);
      }, 1500);
    }
  };

  const handleNewChat = () => {
    setMessages([]);
    setCurrentChatId(null);
  };

  return (
    <div className={`
      flex-1 flex flex-col h-screen transition-all duration-300 ease-in-out
      ${isSidebarOpen ? 'md:ml-72' : 'ml-0'}
    `}>
      {/* Header */}
      <header className="bg-white/5 backdrop-blur-md border-b-2 border-white/20 p-4">
        <div className="flex items-center justify-end">
          {/* Profile with dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
              className="flex items-center gap-3 bg-white/10 hover:bg-white/20 px-3 py-2 rounded-lg cursor-pointer transition-all border border-white/20"
            >
              <FiUser size={20} className="text-gray-800" />
              <span className="text-gray-800 font-medium">Profile</span>
              <FiChevronDown size={16} className="text-gray-800" />
            </button>

            {/* Dropdown Menu */}
            {isProfileMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white/10 backdrop-blur-md border-2 border-white/20 rounded-lg shadow-xl z-50">
                <div className="py-1">
                  <button className="w-full flex items-center gap-3 px-4 py-2 text-gray-800 hover:bg-white/10 transition-all">
                    <FiUser size={16} />
                    <span>My Profile</span>
                  </button>
                  <button className="w-full flex items-center gap-3 px-4 py-2 text-gray-800 hover:bg-white/10 transition-all">
                    <FiSettings size={16} />
                    <span>Settings</span>
                  </button>
                  <hr className="border-white/20 my-1" />
                  <button className="w-full flex items-center gap-3 px-4 py-2 text-red-400 hover:bg-white/10 transition-all">
                    <FiLogOut size={16} />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Messages Container */}
      <main className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          // Welcome Message (shown when no messages)
          <div className="flex items-center justify-center h-full">
            <div className="bg-white/5 backdrop-blur-md border-2 border-white/20 rounded-2xl p-8 w-96 shadow-2xl">
              <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
                ChatGPT
              </h2>
              <p className="text-gray-700 text-center">
                Welcome to ChatGPT! Start a conversation by typing a message below.
              </p>
            </div>
          </div>
        ) : (
          // Messages List
          <div className="max-w-4xl mx-auto space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`
                    max-w-[70%] rounded-2xl p-4 backdrop-blur-md border-2
                    ${msg.sender === 'user' 
                      ? 'bg-blue-500/20 border-blue-500/30 text-white' 
                      : 'bg-white/10 border-white/20 text-gray-800'
                    }
                  `}
                >
                  <p className="text-sm">{msg.text}</p>
                  <span className="text-xs opacity-50 mt-1 block">
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            ))}
            
            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white/10 backdrop-blur-md border-2 border-white/20 rounded-2xl p-4">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer - Query Section */}
      <footer className="bg-white/5 backdrop-blur-md border-t-2 border-white/20 p-4">
        <form onSubmit={handleSendMessage}>
          <div className="relative max-w-4xl mx-auto">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ask anything..."
              className="w-full bg-white/10 border-2 border-white/20 rounded-lg px-4 py-3 pr-12 text-white placeholder-gray-400 focus:outline-none focus:border-white/40 focus:bg-white/20 transition-all"
              style={{ 
                color: 'white',
                WebkitTextFillColor: 'white',
              }}
            />
            <button
              type="submit"
              disabled={!message.trim()}
              className={`absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg transition-all ${
                message.trim()
                  ? 'text-white hover:bg-white/20'
                  : 'text-gray-500 cursor-not-allowed'
              }`}
            >
              <FiSend size={20} />
            </button>
          </div>
        </form>
      </footer>

      {/* Click outside to close dropdown */}
      {isProfileMenuOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsProfileMenuOpen(false)}
        />
      )}
    </div>
  );
};

export default MainContent;