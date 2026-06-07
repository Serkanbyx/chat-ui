import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Phone, Video, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useChatStore } from '@/store/chatStore';

interface ChatHeaderProps {
  conversationId: string;
}

/**
 * Header component for the chat view
 * Shows participant info and action buttons
 */
function ChatHeader({ conversationId }: ChatHeaderProps) {
  const navigate = useNavigate();
  const getConversationById = useChatStore((state) => state.getConversationById);
  const getOtherParticipant = useChatStore((state) => state.getOtherParticipant);

  const conversation = getConversationById(conversationId);
  if (!conversation) return null;

  const otherParticipant = getOtherParticipant(conversation);
  if (!otherParticipant) return null;

  // Get initials for avatar fallback
  const initials = otherParticipant.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  const handleBack = () => {
    navigate('/');
  };

  return (
    <header className="flex items-center justify-between border-b border-border px-4 py-3">
      {/* Left section: Back button and user info */}
      <div className="flex items-center gap-3">
        {/* Back button (mobile only) */}
        <Button
          variant="ghost"
          size="icon"
          onClick={handleBack}
          className="md:hidden"
          aria-label="Go back"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>

        {/* User avatar and info */}
        <div className="relative">
          <Avatar className="h-10 w-10">
            <AvatarImage
              src={otherParticipant.avatar}
              alt={otherParticipant.name}
            />
            <AvatarFallback className="bg-primary/10 text-primary">
              {initials}
            </AvatarFallback>
          </Avatar>
          {otherParticipant.isOnline && (
            <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-background bg-green-500" />
          )}
        </div>

        <div className="flex flex-col">
          <span className="font-semibold">{otherParticipant.name}</span>
          <span className="text-xs text-muted-foreground">
            {otherParticipant.isOnline ? 'Online' : 'Offline'}
          </span>
        </div>
      </div>

      {/* Right section: Action buttons */}
      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="icon"
          aria-label="Voice call"
          className="text-muted-foreground hover:text-foreground"
        >
          <Phone className="h-5 w-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Video call"
          className="text-muted-foreground hover:text-foreground"
        >
          <Video className="h-5 w-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          aria-label="More options"
          className="text-muted-foreground hover:text-foreground"
        >
          <MoreVertical className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
}

export default ChatHeader;
