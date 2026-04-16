import React, { useState, useEffect } from 'react';
import { FiUser, FiChevronDown, FiSettings, FiLogOut, FiSend } from 'react-icons/fi';
import API from "../api/config";

const MainContent = ({ isSidebarOpen, onUpdateChats, chats, onSelectChat, selectedChatId }) => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [currentChatId, setCurrentChatId] = useState(null);

  // Load selected chat
  useEffect(() => {
    if (currentChatId) {
      const selectedChat = chats.find(chat => chat._id === currentChatId);
      if (selectedChat) {
        setMessages(selectedChat.messages || []);
      }
    }
  }, [currentChatId, chats]);

  // Sync chats to parent
  useEffect(() => {
    if (messages.length > 0 && currentChatId) {
      const updatedChats = chats.map(chat =>
        chat._id === currentChatId
          ? { ...chat, messages, lastUpdated: Date.now() }
          : chat
      );
      onUpdateChats(updatedChats);
    }
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: message,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, userMessage]);
    setMessage('');
    setIsTyping(true);

    try {
      let chatId = currentChatId;

      // Create chat if not exists
      if (!chatId) {
        const { data } = await API.post("/chat/new");
        chatId = data._id;
        setCurrentChatId(chatId);
        onSelectChat(chatId);
      }

      // Send message
      const { data } = await API.post(`/chat/${chatId}`, {
        question: userMessage.text
      });

      const aiMessage = {
        id: Date.now(),
        text: data.conversation.answer,
        sender: 'ai',
        timestamp: new Date().toLocaleTimeString()
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error(error);

      setMessages(prev => [
        ...prev,
        {
          id: Date.now(),
          text: "Error getting response",
          sender: 'ai',
          timestamp: new Date().toLocaleTimeString()
        }
      ]);
    }

    setIsTyping(false);
  };

 useEffect(() => {
  if (selectedChatId) {
    setCurrentChatId(selectedChatId);
  } else {
    // ✅ FORCE NEW CHAT RESET
    setCurrentChatId(null);
    setMessages([]);
  }
}, [selectedChatId]);

  const handleLogout = async () => {
  try {
    await API.post("/User/logout"); // ✅ match your backend
    localStorage.removeItem("token"); // remove JWT
    sessionStorage.clear();           // optional
    window.location.href = "/login";  // redirect
  } catch (error) {
    console.error("Logout error:", error);
  }
};
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isProfileMenuOpen && !event.target.closest('.profile-menu-container')) {
        setIsProfileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isProfileMenuOpen]);

  return (
    <div className={`flex-1 flex flex-col h-screen ${isSidebarOpen ? 'md:ml-72' : ''}`}>
      
      {/* Header */}
      <header className="p-4 flex justify-end relative">
        <div className="profile-menu-container relative">
          <button
            onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
            className="p-2 rounded-full hover:bg-gray-200 transition-colors"
          >
            <FiUser size={20} />
          </button>

          {/* DROPDOWN MENU */}
          {isProfileMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg border z-50">
              {/* Settings */}
              <button 
                onClick={() => {
                  setIsProfileMenuOpen(false);
                  // Add settings logic here
                }}
                className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-100 text-sm text-gray-700 transition-colors"
              >
                <FiSettings size={16} /> Settings
              </button>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 w-full px-4 py-2 hover:bg-red-50 text-sm text-red-600 transition-colors border-t"
              >
                <FiLogOut size={16} /> Logout
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Messages */}
      <main className="flex-1 overflow-y-auto p-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Welcome to ChatGPT
            </h1>
            <p className="text-xl text-gray-600">
              How can I help you today?
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map(msg => (
              <div 
                key={msg.id} 
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[70%] p-3 rounded-lg ${
                    msg.sender === 'user' 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-200 text-gray-800'
                  }`}
                >
                  <p>{msg.text}</p>
                  <span className="text-xs opacity-70 mt-1 block">
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-200 text-gray-800 p-3 rounded-lg">
                  <p>Typing...</p>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Input */}
      <form onSubmit={handleSendMessage} className="p-4 border-t">
        <div className="flex gap-2">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask anything..."
            className="flex-1 border rounded-lg p-2 focus:outline-none focus:border-blue-500"
          />
          <button 
            type="submit"
            disabled={!message.trim()}
            className={`px-4 py-2 rounded-lg ${
              message.trim() 
                ? 'bg-blue-500 text-white hover:bg-blue-600' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <FiSend />
          </button>
        </div>
      </form>

    </div>
  );
};

export default MainContent;