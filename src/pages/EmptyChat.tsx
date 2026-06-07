import { useEffect } from 'react';
import { MessageSquare } from 'lucide-react';
import { useChatStore } from '@/store/chatStore';

/**
 * Empty state component shown when no chat is selected
 */
function EmptyChat() {
  const setActiveChat = useChatStore((state) => state.setActiveChat);

  // Clear the active chat whenever the empty state is shown.
  useEffect(() => {
    setActiveChat(null);
  }, [setActiveChat]);

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
      <div className="rounded-full bg-primary/10 p-6">
        <MessageSquare className="h-12 w-12 text-primary" />
      </div>
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold text-foreground">
          Welcome to Chat UI
        </h2>
        <p className="max-w-md text-muted-foreground">
          Select a conversation from the sidebar to start chatting, or search
          for someone to message.
        </p>
      </div>
    </div>
  );
}

export default EmptyChat;
