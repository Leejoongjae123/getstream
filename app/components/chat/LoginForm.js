'use client';

import { useState } from 'react';

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username.trim()) return;

    setLoading(true);
    
    // 실제 구현에서는 서버에 요청을 보내 토큰을 받아야 합니다
    // 지금은 더미 데이터로 로그인을 시뮬레이션합니다
    setTimeout(() => {
      onLogin({
        apiKey: '24shahgdya7x', // GetStream 대시보드에서 실제 API 키로 변경하세요
        userId: `user-${Math.floor(Math.random() * 10000)}`,
        userName: username,
        userToken: 'EXAMPLE_TOKEN', // 실제 구현에서는 서버에서 생성된 토큰을 사용하세요
      });
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">채팅 로그인</h2>
      <form onSubmit={handleSubmit} className="w-full">
        <div className="mb-4">
          <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-700">
            사용자 이름
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="사용자 이름을 입력하세요"
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {loading ? '로그인 중...' : '채팅 시작하기'}
        </button>
      </form>
    </div>
  );
};

export default LoginForm; 