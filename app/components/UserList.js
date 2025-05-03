'use client';

import { useState, useEffect } from 'react';
import { useChatContext } from 'stream-chat-react';

const UserList = ({ onSelect }) => {
  const { client } = useChatContext();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // 사용자 목록 불러오기
  useEffect(() => {
    const loadUsers = async () => {
      if (!client) return;
      
      try {
        setLoading(true);
        // 최대 25명의 사용자 가져오기 (실제 앱에서는 페이지네이션 구현 필요)
        const response = await client.queryUsers(
          { id: { $ne: client.userID } },
          { id: 1 },
          { limit: 25 }
        );
        
        setUsers(response.users);
      } catch (err) {
        console.error('사용자 목록 불러오기 오류:', err);
        setError('사용자 목록을 불러올 수 없습니다');
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, [client]);

  // 필터링된 사용자 목록
  const filteredUsers = searchTerm.trim() 
    ? users.filter(user => 
        user.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
        user.id.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : users;

  return (
    <div className="user-list">
      {/* 검색 입력 */}
      <div className="p-2 border-b">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="사용자 검색..."
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      {error && (
        <div className="p-3 text-center text-red-500">
          {error}
        </div>
      )}

      {loading ? (
        <div className="p-3 text-center text-gray-500">
          사용자 목록 불러오는 중...
        </div>
      ) : filteredUsers.length === 0 ? (
        <div className="p-3 text-center text-gray-500">
          {searchTerm ? '검색 결과가 없습니다' : '사용자가 없습니다'}
        </div>
      ) : (
        <ul>
          {filteredUsers.map(user => (
            <li 
              key={user.id} 
              className="p-2 hover:bg-gray-100 cursor-pointer flex items-center"
              onClick={() => onSelect(user)}
            >
              <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200 mr-2">
                <img 
                  src={user.image || `https://getstream.io/random_png/?name=${user.id}`} 
                  alt={user.name || user.id}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="font-medium">{user.name || user.id}</div>
                <div className="text-xs text-gray-500">{user.id}</div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserList; 