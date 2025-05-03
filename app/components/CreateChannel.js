'use client';

import { useState } from 'react';
import { useChatContext } from 'stream-chat-react';
import UserList from './UserList';

const CreateChannel = ({ onSuccess }) => {
  const { client } = useChatContext();
  const [channelName, setChannelName] = useState('');
  const [memberId, setMemberId] = useState('');
  const [showUserList, setShowUserList] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState('');

  const handleUserSelect = (user) => {
    setMemberId(user.id);
    setShowUserList(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!channelName.trim()) {
      setError('채팅방 이름을 입력해주세요');
      return;
    }

    if (!memberId.trim()) {
      setError('대화 상대의 ID를 입력해주세요');
      return;
    }

    setIsCreating(true);
    setError('');

    try {
      // 현재 사용자와 선택한 상대방을 채널 멤버로 추가
      const members = [client.userID, memberId];
      
      // 메시징 타입의 채널 생성
      const channel = client.channel('messaging', {
        members,
        name: channelName,
      });

      // 채널 생성 및 첫 메시지 전송
      await channel.create();
      await channel.watch();
      await channel.sendMessage({
        text: '채팅방이 생성되었습니다! 대화를 시작하세요.',
      });

      setChannelName('');
      setMemberId('');
      
      if (onSuccess) {
        onSuccess(channel);
      }
    } catch (error) {
      console.error('채널 생성 오류:', error);
      setError('채팅방을 생성하는 중에 오류가 발생했습니다');
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="bg-white rounded-lg">
      <h2 className="text-lg font-bold mb-4">새 채팅방 만들기</h2>
      
      {error && (
        <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="channelName" className="block mb-1 font-medium">
            채팅방 이름
          </label>
          <input
            id="channelName"
            type="text"
            value={channelName}
            onChange={(e) => setChannelName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="채팅방 이름 입력"
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="memberId" className="block mb-1 font-medium">
            대화 상대 ID
          </label>
          <div className="flex">
            <input
              id="memberId"
              type="text"
              value={memberId}
              onChange={(e) => setMemberId(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="상대방 ID 입력"
            />
            <button
              type="button"
              onClick={() => setShowUserList(!showUserList)}
              className="px-3 py-2 bg-gray-200 text-gray-700 rounded-r-md hover:bg-gray-300"
            >
              사용자 검색
            </button>
          </div>
        </div>

        {showUserList && (
          <div className="mb-4 border rounded-md max-h-48 overflow-y-auto">
            <UserList onSelect={handleUserSelect} />
          </div>
        )}
        
        <button
          type="submit"
          disabled={isCreating}
          className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {isCreating ? '생성 중...' : '채팅방 만들기'}
        </button>
      </form>
    </div>
  );
};

export default CreateChannel; 