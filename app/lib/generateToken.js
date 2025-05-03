'use client';

import { createToken } from 'stream-chat';

/**
 * 클라이언트 측에서 테스트용 토큰을 생성하는 함수
 * 주의: 이 방법은 개발 테스트용으로만 사용해야 합니다.
 * 실제 프로덕션 환경에서는 서버 측에서 토큰을 생성해야 합니다.
 * 
 * @param {string} userId - 사용자 ID
 * @param {string} secret - GetStream API 시크릿
 * @returns {string} - 생성된 토큰
 */
export const generateTestToken = (userId, secret) => {
  if (!secret) {
    console.warn('API 시크릿이 제공되지 않았습니다. 테스트 토큰을 생성할 수 없습니다.');
    return null;
  }
  
  try {
    return createToken(secret, userId);
  } catch (error) {
    console.error('토큰 생성 오류:', error);
    return null;
  }
};

export default generateTestToken; 