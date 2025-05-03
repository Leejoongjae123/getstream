'use client';

import { useEffect, useState } from 'react';
import { StreamChat } from 'stream-chat';
import { Chat, Channel, Window, ChannelHeader, MessageList, MessageInput, Thread, ChannelList } from 'stream-chat-react';

const ChatClient = ({ apiKey, userId, userName, userToken }) => {
  const [client, setClient] = useState(null);

  useEffect(() => {
    const initChat = async () => {
      const chatClient = StreamChat.getInstance(apiKey);

      await chatClient.connectUser(
        {
          id: userId,
          name: userName,
        },
        userToken
      );

      setClient(chatClient);
    };

    if (apiKey && userId && userToken) {
      initChat();
    }

    return () => {
      if (client) {
        client.disconnectUser();
      }
    };
  }, [apiKey, userId, userName, userToken]);

  if (!client) {
    return <div className="flex items-center justify-center h-full">로딩 중...</div>;
  }

  return (
    <div className="h-full">
      <Chat client={client} theme="messaging light">
        <div className="flex h-full">
          <div className="w-1/4 border-r border-gray-200">
            <ChannelList
              filters={{ members: { $in: [userId] } }}
              sort={{ last_message_at: -1 }}
              options={{ state: true, watch: true, presence: true }}
            />
          </div>
          <div className="w-3/4">
            <Channel>
              <Window>
                <ChannelHeader />
                <MessageList />
                <MessageInput />
              </Window>
              <Thread />
            </Channel>
          </div>
        </div>
      </Chat>
    </div>
  );
};

export default ChatClient; 