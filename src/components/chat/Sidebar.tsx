import { useState } from 'react';
import { Search, MessageCircle, Moon, Sun } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import ConversationItem from './ConversationItem';
import { useChatStore } from '@/store/chatStore';
import { useThemeStore } from '@/store/themeStore';

/**
 * Sidebar component displaying the list of conversations
 * Includes search functionality and conversation filtering
 */
function Sidebar() {
  const [searchQuery, setSearchQuery] = useState('');
  const conversations = useChatStore((state) => state.conversations);
  const currentUser = useChatStore((state) => state.currentUser);
  const getOtherParticipant = useChatStore((state) => state.getOtherParticipant);
  const theme = useThemeStore((state) => state.theme);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);

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
          <span className="hidden text-sm text-muted-foreground sm:inline">
            {currentUser.name}
          </span>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            className="text-muted-foreground hover:text-foreground"
          >
            {theme === 'dark' ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>
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

      {/* Footer - Signature */}
      <footer className="border-t border-border p-3 text-center text-xs text-muted-foreground">
        Created by{' '}
        <a
          href="https://serkanbayraktar.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline"
        >
          Serkanby
        </a>
        {' | '}
        <a
          href="https://github.com/Serkanbyx"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline"
        >
          Github
        </a>
      </footer>
    </div>
  );
}

export default Sidebar;
