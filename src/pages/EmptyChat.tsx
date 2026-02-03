import { MessageSquare } from 'lucide-react';

/**
 * Empty state component shown when no chat is selected
 */
function EmptyChat() {
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
