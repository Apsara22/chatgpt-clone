import React, { useState } from 'react';
import { FiMenu, FiX, FiMessageSquare, FiPlus } from 'react-icons/fi';

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Dummy chat data
  const dummyChats = [
    { id: 1, title: "Website Design Discussion", date: "2 hours ago", preview: "Let's talk about the new layout..." },
    { id: 2, title: "Project Requirements", date: "Yesterday", preview: "We need to finalize the features..." },
    { id: 3, title: "Bug Fixing Session", date: "3 days ago", preview: "Found an issue with the login..." },
    { id: 4, title: "API Integration", date: "1 week ago", preview: "Working on the REST endpoints..." },
  ];

  return (
    <>
      {/* Menu Icon - visible when sidebar is closed */}
      {!isSidebarOpen && (
        <button
          onClick={toggleSidebar}
          className="fixed top-4 left-4 z-50 p-2 bg-white/5 backdrop-blur-md border-2 border-white/20 rounded-lg text-gray-800 hover:bg-white/10 transition-all"
        >
          <FiMenu size={24} />
        </button>
      )}

      {/* Sidebar - conditionally rendered */}
      {isSidebarOpen && (
        <div className="fixed left-0 top-0 h-screen w-72 bg-white/5 backdrop-blur-md border-r-2 border-white/20 p-4 z-40 overflow-y-auto">
          {/* Header with title and cross icon */}
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-800">ChatGpt</h3>
            <button
              onClick={toggleSidebar}
              className="p-1 hover:bg-white/10 rounded-lg transition-all"
            >
              <FiX size={20} className="text-gray-800" />
            </button>
          </div>

          {/* New Chat Button */}
          <button className="w-full mb-4 flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-gray-800 font-medium py-2 px-4 rounded-lg transition-all border border-white/20">
            <FiPlus size={18} />
            <span>New Chat</span>
          </button>

          {/* Chats Section */}
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-2">
              Recent Chats
            </h4>
            
            {/* Dummy Chat Items */}
            {dummyChats.map((chat) => (
              <div
                key={chat.id}
                className="group p-3 hover:bg-white/10 rounded-lg cursor-pointer transition-all border border-transparent hover:border-white/20"
              >
                <div className="flex items-start gap-3">
                  <FiMessageSquare className="text-gray-600 mt-1 flex-shrink-0" size={16} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h5 className="font-medium text-gray-800 text-sm truncate">
                        {chat.title}
                      </h5>
                      <span className="text-xs text-gray-500 ml-2 flex-shrink-0">
                        {chat.date}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 truncate mt-1">
                      {chat.preview}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* View All Link */}
            <button className="w-full text-sm text-gray-600 hover:text-gray-800 py-2 text-center hover:bg-white/5 rounded-lg transition-all mt-2">
              View all chats →
            </button>
          </div>
        </div>
      )}

      {/* Overlay - closes sidebar when clicking outside (optional) */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 md:hidden"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
};

export default Sidebar;