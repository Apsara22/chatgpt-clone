import React, { useState } from 'react';
import { FiUser, FiChevronDown, FiSettings, FiLogOut, FiSend } from 'react-icons/fi';

const MainContent = () => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [message, setMessage] = useState('');

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      // Handle sending message here
      console.log('Sending message:', message);
      setMessage('');
    }
  };

  return (
    <div className="flex-1 flex flex-col">
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

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-8">
        <div className="bg-white/5 backdrop-blur-md border-2 border-white/20 rounded-2xl p-8 w-96 shadow-2xl">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
            ChatGPT
          </h2>
          <p className="text-gray-700 text-center">
            Welcome to ChatGPT! This page is under construction.
          </p>
        </div>
      </main>

      {/* Footer - Query Section */}
      <footer className="bg-white/5 backdrop-blur-md border-t-2 border-white/20 p-4">
        <form onSubmit={handleSendMessage} className="flex items-center gap-3">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask anything..."
            className="flex-1 bg-white/10 border-2 border-white/20 rounded-lg px-4 py-3 text-gray-800 placeholder-gray-500 focus:outline-none focus:border-white/40 transition-all"
          />
          <button
            type="submit"
            disabled={!message.trim()}
            className={`p-3 rounded-lg transition-all ${
              message.trim()
                ? 'bg-white/20 hover:bg-white/30 text-gray-800'
                : 'bg-white/5 text-gray-500 cursor-not-allowed'
            }`}
          >
            <FiSend size={20} />
          </button>
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