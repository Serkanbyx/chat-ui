import { Check, CheckCheck } from 'lucide-react';
import { Message } from '@/types';
import { formatTime, cn } from '@/lib/utils';

interface MessageBubbleProps {
  message: Message;
  isOwn: boolean;
  isFirstInGroup: boolean;
  isLastInGroup: boolean;
}

/**
 * Individual message bubble component
 * Handles styling for own vs other messages and consecutive message grouping
 */
function MessageBubble({
  message,
  isOwn,
  isFirstInGroup,
  isLastInGroup,
}: MessageBubbleProps) {
  return (
    <div
      className={cn(
        'flex w-full animate-fade-in',
        isOwn ? 'justify-end' : 'justify-start',
        !isLastInGroup && 'mb-0.5'
      )}
    >
      <div
        className={cn(
          'max-w-[75%] px-4 py-2 sm:max-w-[65%]',
          // Base styles
          isOwn
            ? 'bg-primary text-primary-foreground'
            : 'bg-muted text-foreground',
          // Border radius based on position in group
          isOwn
            ? cn(
                'rounded-2xl',
                isFirstInGroup && 'rounded-tr-md',
                isLastInGroup && 'rounded-br-md',
                !isFirstInGroup && !isLastInGroup && 'rounded-r-md'
              )
            : cn(
                'rounded-2xl',
                isFirstInGroup && 'rounded-tl-md',
                isLastInGroup && 'rounded-bl-md',
                !isFirstInGroup && !isLastInGroup && 'rounded-l-md'
              )
        )}
      >
        {/* Message content */}
        <p className="whitespace-pre-wrap break-words text-sm leading-relaxed">
          {message.content}
        </p>

        {/* Timestamp and read status */}
        <div
          className={cn(
            'mt-1 flex items-center gap-1',
            isOwn ? 'justify-end' : 'justify-start'
          )}
        >
          <span
            className={cn(
              'text-xs',
              isOwn ? 'text-primary-foreground/70' : 'text-muted-foreground'
            )}
          >
            {formatTime(new Date(message.timestamp))}
          </span>

          {/* Read status indicator (only for own messages) */}
          {isOwn && (
            <span className="text-primary-foreground/70">
              {message.isRead ? (
                <CheckCheck className="h-3.5 w-3.5" />
              ) : (
                <Check className="h-3.5 w-3.5" />
              )}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default MessageBubble;
