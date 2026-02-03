import { useState } from 'react';
import { Search, MessageCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import ConversationItem from './ConversationItem';
import { useChatStore } from '@/store/chatStore';

/**
 * Sidebar component displaying the list of conversations
 * Includes search functionality and conversation filtering
 */
function Sidebar() {
  const [searchQuery, setSearchQuery] = useState('');
  const { conversations, currentUser, getOtherParticipant } = useChatStore();

  // Filter conversations based on search query
  const filteredConversations = conversations.filter((conversation) => {
    const otherParticipant = getOtherParticipant(conversation);
    if (!otherParticipant) return false;

    return otherParticipant.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
  });

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border p-4">
        <div className="flex items-center gap-2">
          <MessageCircle className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-semibold">Messages</h1>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            {currentUser.name}
          </span>
        </div>
      </div>

      {/* Search bar */}
      <div className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Conversations list */}
      <ScrollArea className="flex-1">
        <div className="flex flex-col gap-1 p-2">
          {filteredConversations.length > 0 ? (
            filteredConversations.map((conversation) => (
              <ConversationItem
                key={conversation.id}
                conversation={conversation}
              />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center gap-2 py-8 text-center">
              <Search className="h-8 w-8 text-muted-foreground/50" />
              <p className="text-sm text-muted-foreground">
                {searchQuery
                  ? 'No conversations found'
                  : 'No conversations yet'}
              </p>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}

export default Sidebar;
