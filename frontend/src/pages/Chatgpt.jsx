import React, { useState } from 'react';
import BackgroundLayout from '../components/BackgroundLayout';
import Sidebar from '../components/Sidebar';
import MainContent from '../components/MainContent';

export const Chatgpt = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [chats, setChats] = useState([]);
  const [selectedChatId, setSelectedChatId] = useState(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleUpdateChats = (updatedChats) => {
    setChats(updatedChats);
  };

  const handleNewChat = () => {
    setSelectedChatId(null);
  };

  const handleSelectChat = (chatId) => {
    setSelectedChatId(chatId);
  };

  return (
    <BackgroundLayout>
      <div className="flex h-screen overflow-hidden">
        <Sidebar 
          isOpen={isSidebarOpen} 
          onToggle={toggleSidebar}
          chats={chats}
          onNewChat={handleNewChat}
          onSelectChat={handleSelectChat}
        />
        <MainContent 
          isSidebarOpen={isSidebarOpen}
          onUpdateChats={handleUpdateChats}
          chats={chats}
          onSelectChat={handleSelectChat}
        />
      </div>
    </BackgroundLayout>
  );
};

export default Chatgpt;