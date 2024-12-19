import React from 'react';
import { useMessageStore } from '../../stores/messageStore';

interface Conversation {
  userId: string;
  name: string;
  lastMessage: string;
  unreadCount: number;
  lastMessageTime: Date;
}

interface ConversationListProps {
  conversations: Conversation[];
  onSelectConversation: (userId: string) => void;
  selectedUserId: string | null;
}

export function ConversationList({
  conversations,
  onSelectConversation,
  selectedUserId
}: ConversationListProps) {
  return (
    <div className="border-r h-full">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">Messages</h2>
      </div>
      
      <div className="overflow-y-auto">
        {conversations.map((conversation) => (
          <button
            key={conversation.userId}
            onClick={() => onSelectConversation(conversation.userId)}
            className={`w-full p-4 text-left hover:bg-gray-50 ${
              selectedUserId === conversation.userId ? 'bg-gray-50' : ''
            }`}
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium">{conversation.name}</h3>
                <p className="text-sm text-gray-500 truncate">
                  {conversation.lastMessage}
                </p>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-xs text-gray-500">
                  {conversation.lastMessageTime.toLocaleDateString()}
                </span>
                {conversation.unreadCount > 0 && (
                  <span className="mt-1 px-2 py-1 text-xs bg-indigo-600 text-white rounded-full">
                    {conversation.unreadCount}
                  </span>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}