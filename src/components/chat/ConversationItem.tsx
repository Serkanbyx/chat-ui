import { useNavigate, useParams } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Conversation } from '@/types';
import { useChatStore } from '@/store/chatStore';
import { formatTime } from '@/lib/utils';
import { cn } from '@/lib/utils';

interface ConversationItemProps {
  conversation: Conversation;
}

/**
 * Individual conversation item in the sidebar
 * Shows participant info, last message preview, and unread count
 */
function ConversationItem({ conversation }: ConversationItemProps) {
  const navigate = useNavigate();
  const { id: activeId } = useParams<{ id: string }>();
  const { getOtherParticipant, currentUser } = useChatStore();

  const otherParticipant = getOtherParticipant(conversation);
  const isActive = activeId === conversation.id;

  if (!otherParticipant) return null;

  // Get initials for avatar fallback
  const initials = otherParticipant.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  // Format last message preview
  const lastMessagePreview = conversation.lastMessage
    ? conversation.lastMessage.senderId === currentUser.id
      ? `You: ${conversation.lastMessage.content}`
      : conversation.lastMessage.content
    : 'No messages yet';

  // Truncate long messages
  const truncatedMessage =
    lastMessagePreview.length > 40
      ? `${lastMessagePreview.substring(0, 40)}...`
      : lastMessagePreview;

  const handleClick = () => {
    navigate(`/chat/${conversation.id}`);
  };

  return (
    <button
      onClick={handleClick}
      className={cn(
        'flex w-full items-center gap-3 rounded-lg p-3 text-left transition-colors',
        'hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
        isActive && 'bg-accent'
      )}
    >
      {/* Avatar with online indicator */}
      <div className="relative">
        <Avatar className="h-12 w-12">
          <AvatarImage src={otherParticipant.avatar} alt={otherParticipant.name} />
          <AvatarFallback className="bg-primary/10 text-primary">
            {initials}
          </AvatarFallback>
        </Avatar>
        {otherParticipant.isOnline && (
          <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background bg-green-500" />
        )}
      </div>

      {/* Conversation details */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <div className="flex items-center justify-between gap-2">
          <span className="truncate font-medium">{otherParticipant.name}</span>
          {conversation.lastMessage && (
            <span className="shrink-0 text-xs text-muted-foreground">
              {formatTime(conversation.lastMessage.timestamp)}
            </span>
          )}
        </div>
        <div className="flex items-center justify-between gap-2">
          <span className="truncate text-sm text-muted-foreground">
            {truncatedMessage}
          </span>
          {conversation.unreadCount > 0 && (
            <span className="flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full bg-primary px-1.5 text-xs font-medium text-primary-foreground">
              {conversation.unreadCount}
            </span>
          )}
        </div>
      </div>
    </button>
  );
}

export default ConversationItem;
