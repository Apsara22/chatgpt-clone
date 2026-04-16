import React from 'react';
import { FiMenu, FiX, FiMessageSquare, FiPlus, FiTrash } from 'react-icons/fi';

const Sidebar = ({ isOpen, onToggle, chats = [], onNewChat, onSelectChat, onDeleteChat }) => {
  // Format date to relative time
  const formatRelativeTime = (timestamp) => {
    const now = new Date();
    const messageTime = new Date(timestamp);
    const diffInSeconds = Math.floor((now - messageTime) / 1000);

    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;
    return messageTime.toLocaleDateString();
  };

  // Get preview from first message or use default
  const getChatPreview = (chat) => {
    if (chat.messages && chat.messages.length > 0) {
      const firstMessage = chat.messages[0];
      return firstMessage.text.length > 40 ? firstMessage.text.substring(0, 40) + '...' : firstMessage.text;
    }
    return 'New conversation';
  };

  return (
    <>
      {/* Menu Icon - visible when sidebar is closed */}
      {!isOpen && (
        <button
          onClick={onToggle}
          className="fixed top-4 left-4 z-50 p-2 bg-white/5 backdrop-blur-md border-2 border-white/20 rounded-lg text-gray-800 hover:bg-white/10 transition-all"
        >
          <FiMenu size={24} />
        </button>
      )}

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-screen bg-white/5 backdrop-blur-md border-r-2 border-white/20 p-4 z-40 overflow-y-auto transition-all duration-300 ease-in-out ${
          isOpen ? 'w-72' : 'w-0 -translate-x-full'
        }`}
      >
        {/* Header with title and cross icon */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-800">ChatGpt</h3>
          <button
            onClick={onToggle}
            className="p-1 hover:bg-white/10 rounded-lg transition-all"
          >
            <FiX size={20} className="text-gray-800" />
          </button>
        </div>

        {/* New Chat Button */}
        <button
          onClick={onNewChat}
          className="w-full mb-4 flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-gray-800 font-medium py-2 px-4 rounded-lg transition-all border border-white/20"
        >
          <FiPlus size={18} />
          <span>New Chat</span>
        </button>

        {/* Chats Section */}
        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-2">
            Recent Chats ({chats.length})
          </h4>

          {/* Chat Items */}
          {chats.length === 0 ? (
            <div className="text-center py-8 text-gray-500 text-sm">
              No chats yet. Start a new conversation!
            </div>
          ) : (
            chats.map((chat) => (
              <div
                key={chat._id}
                onClick={() => onSelectChat(chat._id)}
                className="group p-3 hover:bg-white/10 rounded-lg cursor-pointer transition-all border border-transparent hover:border-white/20"
              >
               
                <div className="flex items-start gap-3">
                  <FiMessageSquare className="text-gray-600 mt-1 flex-shrink-0" size={16} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h5 className="font-medium text-gray-800 text-sm truncate">
                        {chat.title || 'New Chat'}
                      </h5>
                      <span className="text-xs text-gray-500 ml-2 flex-shrink-0">
                        {formatRelativeTime(chat.lastUpdated || chat.timestamp || Date.now())}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 truncate mt-1">
                      {getChatPreview(chat)}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}

          {/* View All Link - show only if more than 5 chats */}
          {chats.length > 5 && (
            <button className="w-full text-sm text-gray-600 hover:text-gray-800 py-2 text-center hover:bg-white/5 rounded-lg transition-all mt-2">
              View all chats →
            </button>
          )}
        </div>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 md:hidden"
          onClick={onToggle}
        />
      )}
    </>
  );
};

export default Sidebar;