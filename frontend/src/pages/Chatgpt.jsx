import React, { useState, useEffect } from 'react';
import BackgroundLayout from '../components/BackgroundLayout';
import Sidebar from '../components/Sidebar';
import MainContent from '../components/MainContent';
import API from '../api/config';

export const Chatgpt = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [chats, setChats] = useState([]);
  const [selectedChatId, setSelectedChatId] = useState(null);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleUpdateChats = (updatedChats) => setChats(updatedChats);

  const handleNewChat = () => {
  setSelectedChatId(""); // 🔥 force change
  setTimeout(() => {
    setSelectedChatId(null); // reset properly
  }, 0);
};

  const handleSelectChat = (chatId) => setSelectedChatId(chatId);

  const handleDeleteChat = async (chatId) => {
    try {
      await API.delete(`/chat/${chatId}`);
      setChats(prev => prev.filter(chat => chat._id !== chatId));
      if (selectedChatId === chatId) setSelectedChatId(null);
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  // Fetch all chats on mount
  useEffect(() => {
    const fetchChats = async () => {
      try {
        const { data } = await API.get("/chat/all");

        // Ensure every chat has _id and title for frontend
        const formattedChats = data.map(chat => ({
          _id: chat._id,
          title: chat.latestMessage || "New Chat",  // ✅ use backend message
          messages: [], // (we load separately)
          lastUpdated: chat.updatedAt || chat.createdAt   // ✅ FIXED
        }));

        setChats(formattedChats);
        console.log("Chats fetched:", formattedChats); // debug
      } catch (error) {
        console.error("Error fetching chats:", error);
      }
    };
    fetchChats();
  }, []);

  return (
    <BackgroundLayout>
      <div className="flex h-screen overflow-hidden">
        <Sidebar
          isOpen={isSidebarOpen}
          onToggle={toggleSidebar}
          chats={chats}
          onNewChat={handleNewChat}
          onSelectChat={handleSelectChat}
          onDeleteChat={handleDeleteChat}
        />
        <MainContent
          isSidebarOpen={isSidebarOpen}
          onUpdateChats={handleUpdateChats}
          chats={chats}
          onSelectChat={handleSelectChat}
          selectedChatId={selectedChatId}
        />
      </div>
    </BackgroundLayout>
  );
};

export default Chatgpt;