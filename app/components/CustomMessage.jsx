import { useMessageContext, useChannelStateContext } from 'stream-chat-react';
import { Avatar, MessageText, MessageTimestamp, MessageStatus, ReactionSelector, ReactionsList } from 'stream-chat-react';
import { useState } from 'react';

const CustomMessage = () => {
  const {
    message,
    isMyMessage,
    handleReaction,
    handleOpenThread,
    threadList,
    reactionSelectorRef,
    showDetailedReactions,
  } = useMessageContext();
  
  // 메시지가 없거나 undefined인 경우 처리
  if (!message) return null;
  
  const messageIsMine = isMyMessage();
  const hasAttachments = message.attachments && message.attachments.length > 0;
  const hasReactions = message.latest_reactions && message.latest_reactions.length > 0;
  
  const messageClasses = `relative flex w-full my-2 ${
    messageIsMine ? 'justify-end' : 'justify-start'
  }`;
  
  return (
    <div className={messageClasses}>
      {/* 상대방 아바타 (내 메시지가 아닌 경우에만 표시) */}
      {!messageIsMine && (
        <div className="mr-2 flex-shrink-0">
          <Avatar 
            image={message.user?.image}
            name={message.user?.name || message.user?.id} 
            size={36}
          />
        </div>
      )}
      
      {/* 메시지 컨텐츠 */}
      <div className={`flex flex-col max-w-[65%] ${messageIsMine ? 'items-end' : 'items-start'}`}>
        {/* 사용자 이름 (내 메시지가 아닌 경우에만 표시) */}
        {!messageIsMine && (
          <div className="text-xs font-semibold text-gray-700 mb-1">
            {message.user?.name || '알 수 없는 사용자'}
          </div>
        )}
        
        {/* 메시지 버블 */}
        <div 
          className={`relative px-4 py-2 max-w-full ${
            messageIsMine 
              ? 'bg-[#007AFF] text-white rounded-tl-full rounded-bl-full rounded-br-full' 
              : 'bg-[#007AFF] text-black rounded-tr-full rounded-bl-full rounded-br-full'
          }`}
        >
          
          {/* 메시지 텍스트 */}
          <div className="text-sm break-words whitespace-pre-wrap ">
            <MessageText />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomMessage; 