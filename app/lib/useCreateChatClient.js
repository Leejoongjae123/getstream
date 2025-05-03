'use client';

import { useEffect, useState } from 'react';
import { StreamChat } from 'stream-chat';

/**
 * StreamChat 클라이언트를 생성하고 관리하는 훅
 * 
 * @param {Object} options 채팅 클라이언트 설정
 * @param {string} options.apiKey - Stream API 키
 * @param {string|Function} options.tokenOrProvider - 토큰 또는 토큰을 반환하는 함수
 * @param {Object} options.userData - 사용자 정보 객체
 * @returns {StreamChat|null} 연결된 StreamChat 클라이언트 또는 null
 */
export function useCreateChatClient({ apiKey, tokenOrProvider, userData }) {
  const [chatClient, setChatClient] = useState(null);

  useEffect(() => {
    // 필수 데이터 확인
    if (!apiKey || !tokenOrProvider || !userData || !userData.id) {
      console.warn('유효하지 않은 설정:', { 
        apiKey: !!apiKey, 
        tokenOrProvider: !!tokenOrProvider, 
        userId: userData?.id 
      });
      return;
    }

    // 이미 연결된 클라이언트가 있는지 확인
    if (chatClient && chatClient.userID === userData.id) {
      return;
    }

    let didCancel = false;
    
    async function initClient() {
      try {
        // StreamChat 인스턴스 생성
        const client = StreamChat.getInstance(apiKey);
        
        // 다른 사용자로 이미 연결되어 있으면 연결 해제
        if (client.userID && client.userID !== userData.id) {
          await client.disconnectUser();
        }
        
        // 토큰 가져오기 (함수인 경우 실행)
        let token;
        if (typeof tokenOrProvider === 'function') {
          token = await tokenOrProvider();
        } else {
          token = tokenOrProvider;
        }

        if (!token) {
          console.error('유효한 토큰을 가져올 수 없습니다');
          return;
        }
        
        // 사용자 연결
        await client.connectUser(
          {
            id: userData.id,
            name: userData.name || userData.id,
            image: userData.image,
          },
          token
        );

        // 컴포넌트가 언마운트되지 않았으면 클라이언트 설정
        if (!didCancel) {
          setChatClient(client);
        }
      } catch (error) {
        console.error('StreamChat 클라이언트 연결 오류:', error);
        if (!didCancel && chatClient) {
          chatClient.disconnectUser();
        }
      }
    }

    initClient();

    // 클린업 함수
    return () => {
      didCancel = true;
      if (chatClient) {
        chatClient.disconnectUser()
          .then(() => console.log('사용자 연결 해제됨'))
          .catch(error => console.error('연결 해제 오류:', error));
      }
    };
  }, [apiKey, tokenOrProvider, userData, chatClient]);

  return chatClient;
} 