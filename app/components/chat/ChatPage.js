'use client';

import { useState, useEffect } from 'react';
import ChatClient from './ChatClient';

const ChatPage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 이것은 예시 데이터입니다. 실제 애플리케이션에서는 백엔드에서 토큰을 생성해야 합니다.
  useEffect(() => {
    // 실제 구현에서는 로그인 후 사용자 정보와 토큰을 가져옵니다
    // 지금은 임시 데이터를 사용합니다
    setTimeout(() => {
      setUser({
        apiKey: '24shahgdya7x', // GetStream 대시보드에서 실제 API 키로 변경하세요
        userId: 'user-123',
        userName: '사용자',
        userToken: 'EXAMPLE_TOKEN', // 실제 구현에서는 서버에서 생성된 토큰을 사용하세요
      });
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl">채팅 로딩 중...</div>
      </div>
    );
  }

  return (
    <div className="h-screen">
      {user ? (
        <ChatClient
          apiKey={user.apiKey}
          userId={user.userId}
          userName={user.userName}
          userToken={user.userToken}
        />
      ) : (
        <div className="flex items-center justify-center h-full">
          <div className="text-xl">로그인이 필요합니다</div>
        </div>
      )}
    </div>
  );
};

export default ChatPage; 