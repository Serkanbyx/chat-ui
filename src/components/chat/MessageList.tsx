import { useEffect, useRef, useMemo } from 'react';
import { useChatStore } from '@/store/chatStore';
import { Message, MessageGroup } from '@/types';
import { formatDateHeader, isSameDay } from '@/lib/utils';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';

interface MessageListProps {
  conversationId: string;
}

/**
 * Message list component with auto-scroll and message grouping
 * Groups messages by date and handles scroll behavior
 */
function MessageList({ conversationId }: MessageListProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { getConversationMessages, isTyping, currentUser } = useChatStore();
  const messages = getConversationMessages(conversationId);

  /**
   * Group messages by date for display with date headers
   */
  const groupedMessages: MessageGroup[] = useMemo(() => {
    const groups: MessageGroup[] = [];

    messages.forEach((message: Message) => {
      const messageDate = new Date(message.timestamp);
      const lastGroup = groups[groups.length - 1];

      if (lastGroup && isSameDay(lastGroup.date, messageDate)) {
        lastGroup.messages.push(message);
      } else {
        groups.push({
          date: messageDate,
          messages: [message],
        });
      }
    });

    return groups;
  }, [messages]);

  /**
   * Auto-scroll to bottom when new messages arrive
   */
  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div
      ref={containerRef}
      className="flex-1 overflow-y-auto p-4"
    >
      <div className="mx-auto flex max-w-3xl flex-col gap-4">
        {groupedMessages.map((group, groupIndex) => (
          <div key={groupIndex} className="flex flex-col gap-2">
            {/* Date header */}
            <div className="flex justify-center">
              <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                {formatDateHeader(group.date)}
              </span>
            </div>

            {/* Messages in this group */}
            {group.messages.map((message, messageIndex) => {
              const isOwn = message.senderId === currentUser.id;
              const previousMessage = group.messages[messageIndex - 1];
              const nextMessage = group.messages[messageIndex + 1];

              // Determine if this is part of a consecutive message group
              const isFirstInGroup =
                !previousMessage || previousMessage.senderId !== message.senderId;
              const isLastInGroup =
                !nextMessage || nextMessage.senderId !== message.senderId;

              return (
                <MessageBubble
                  key={message.id}
                  message={message}
                  isOwn={isOwn}
                  isFirstInGroup={isFirstInGroup}
                  isLastInGroup={isLastInGroup}
                />
              );
            })}
          </div>
        ))}

        {/* Typing indicator */}
        {isTyping && <TypingIndicator />}

        {/* Scroll anchor */}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}

export default MessageList;
