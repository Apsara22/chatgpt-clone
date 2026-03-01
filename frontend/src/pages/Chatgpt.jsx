import React from 'react';
import BackgroundLayout from '../components/BackgroundLayout';
import Sidebar from '../components/Sidebar';
import MainContent from '../components/MainContent';

export const Chatgpt = () => {
  return (
    <BackgroundLayout>
      <div className="flex h-screen">
        <Sidebar />
        <MainContent />
      </div>
    </BackgroundLayout>
  );
};

export default Chatgpt;