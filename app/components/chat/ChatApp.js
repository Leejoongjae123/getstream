'use client';

import { useState } from 'react';
import LoginForm from './LoginForm';
import ChatClient from './ChatClient';

const ChatApp = () => {
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <div className="h-full flex flex-col">
      {user ? (
        <>
          <div className="bg-blue-600 text-white p-3 flex justify-between items-center">
            <h2 className="text-lg font-semibold">GetStream 채팅</h2>
            <div className="flex items-center">
              <span className="mr-4">안녕하세요, {user.userName}님!</span>
              <button
                onClick={handleLogout}
                className="px-3 py-1 bg-blue-700 hover:bg-blue-800 rounded text-sm"
              >
                로그아웃
              </button>
            </div>
          </div>
          <div className="flex-1 overflow-hidden">
            <ChatClient
              apiKey={user.apiKey}
              userId={user.userId}
              userName={user.userName}
              userToken={user.userToken}
            />
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center h-full">
          <LoginForm onLogin={handleLogin} />
        </div>
      )}
    </div>
  );
};

export default ChatApp; 