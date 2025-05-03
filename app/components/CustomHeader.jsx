import { useChannelStateContext } from 'stream-chat-react';

const CustomHeader = () => {
  const { channel } = useChannelStateContext();
  
  // 채널 이름이나 멤버 정보 가져오기
  const channelName = channel?.data?.name || '채팅방';
  
  return (
    <div className="flex items-center justify-between px-4 py-3 border-b bg-white">
      <div className="flex items-center">
        <div className="font-bold">{channelName}</div>
      </div>
    </div>
  );
};

export default CustomHeader; 