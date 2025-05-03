# GetStream 채팅 애플리케이션

Next.js 13 App Router와 GetStream.io를 사용한 실시간 채팅 애플리케이션입니다.

![GetStream 채팅 애플리케이션](https://user-images.githubusercontent.com/YOUR_USERNAME/YOUR_REPO/assets/screenshot.png)

## 🌟 주요 기능

- 실시간 1:1 및 그룹 채팅
- 이모지 지원
- 메시지 스레드 및 답장
- 멤버 초대 및 관리
- 사용자 프로필 및 상태 표시
- 반응형 디자인 (모바일 및 데스크톱 지원)

## 🔧 기술 스택

- **프론트엔드**: Next.js 13 (App Router), React.js, Tailwind CSS
- **채팅 플랫폼**: GetStream.io Chat API
- **서버 사이드**: Next.js 서버 액션
- **이모지**: emoji-mart
- **스타일링**: Tailwind CSS, Stream Chat React 컴포넌트

## 🚀 시작하기

### 사전 요구사항

- Node.js 18.17.0 이상
- npm 또는 yarn
- GetStream.io 계정 및 API 키

### 설치 방법

1. 저장소 복제
```bash
git clone https://github.com/YOUR_USERNAME/getstream_chat_nextjs.git
cd getstream_chat_nextjs
```

2. 의존성 설치
```bash
npm install
# 또는
yarn install
```

3. `.env.local` 파일 생성 및 환경 변수 설정
```
NEXT_PUBLIC_STREAM_API_KEY=your_stream_api_key
STREAM_API_SECRET=your_stream_api_secret
```

4. 개발 서버 실행
```bash
npm run dev
# 또는
yarn dev
```

5. 브라우저에서 `http://localhost:3000` 열기

## 💡 사용 방법

### 채팅 시작하기

1. 애플리케이션에 접속하면 랜덤 사용자 ID가 생성됩니다.
2. "새 채팅방 만들기" 버튼 클릭
3. 채팅방 이름과 대화 상대의 ID 입력
   - 사용자 ID 예시: `user-1234`
4. "채팅방 생성" 버튼 클릭
5. 채팅방에서 메시지 입력 및 전송

### 채팅 기능

- **이모지 전송**: 이모지 아이콘 클릭 후 이모지 선택
- **메시지 답장**: 메시지 호버 시 나타나는 답장 아이콘 클릭
- **스레드 대화**: 메시지 클릭 시 스레드 패널 열림

## 📁 프로젝트 구조

```
getstream_chat_nextjs/
├── app/                     # Next.js 앱 디렉토리
│   ├── components/          # React 컴포넌트
│   │   ├── CreateChannel.js # 채팅방 생성 컴포넌트
│   │   └── UserList.js      # 사용자 목록 컴포넌트
│   ├── lib/                 # 유틸리티 및 API 관련 코드
│   │   ├── action.js        # 서버 액션 (토큰 생성 등)
│   │   └── useCreateChatClient.js # 채팅 클라이언트 훅
│   ├── globals.css          # 전역 스타일
│   └── page.js              # 메인 페이지
├── public/                  # 정적 파일
├── .env.local               # 환경 변수 (예시 참고)
├── next.config.js           # Next.js 설정
├── package.json             # 프로젝트 의존성
└── README.md                # 프로젝트 설명
```

## 🔑 GetStream API 키 설정

1. [GetStream 대시보드](https://getstream.io/dashboard/)에서 계정 생성 또는 로그인
2. 새 앱 생성 (또는 기존 앱 선택)
3. 앱 대시보드에서 API 키 및 Secret 확인
4. `.env.local` 파일에 키 추가:
   ```
   NEXT_PUBLIC_STREAM_API_KEY=your_stream_api_key
   STREAM_API_SECRET=your_stream_api_secret
   ```

## 🔍 문제 해결

### 일반적인 문제

1. **Cannot read properties of undefined (reading 'userID')**
   - 채팅 클라이언트 초기화 문제. API 키와 시크릿이 올바르게 설정되었는지 확인하세요.

2. **Module not found: Can't resolve 'stream-chat-react/dist/css/index.css'**
   - CSS 경로 문제. stream-chat-react 패키지 버전에 따라 CSS 경로가 다를 수 있습니다.
   - globals.css 파일에서 CSS 가져오기 경로를 확인하세요.

3. **API 키 관련 오류**
   - .env.local 파일이 올바른 경로에 있는지 확인하세요.
   - Next.js 서버를 재시작하세요.

## 📝 라이선스

MIT 라이선스. 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

## 👥 기여하기

1. 저장소 Fork
2. 기능 브랜치 생성 (`git checkout -b feature/amazing-feature`)
3. 변경 사항 커밋 (`git commit -m 'Add amazing feature'`)
4. 브랜치 푸시 (`git push origin feature/amazing-feature`)
5. Pull Request 열기

## 📞 연락처

- 프로젝트 링크: [https://github.com/YOUR_USERNAME/getstream_chat_nextjs](https://github.com/YOUR_USERNAME/getstream_chat_nextjs)

## 🙏 감사의 말

- [GetStream.io](https://getstream.io/) - 강력한 채팅 API 제공
- [Next.js](https://nextjs.org/) - 리액트 프레임워크
- [Tailwind CSS](https://tailwindcss.com/) - CSS 프레임워크
- [emoji-mart](https://github.com/missive/emoji-mart) - 이모지 선택기
