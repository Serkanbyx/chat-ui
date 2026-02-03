import { Outlet } from 'react-router-dom';
import Sidebar from '@/components/chat/Sidebar';
import { useChatStore } from '@/store/chatStore';

/**
 * Main layout for the chat application
 * Contains the sidebar with conversations and the main chat area
 */
function ChatLayout() {
  const activeChat = useChatStore((state) => state.activeChat);

  return (
    <div className="flex h-screen w-full bg-background">
      {/* Sidebar - hidden on mobile when chat is active */}
      <aside
        className={`${
          activeChat ? 'hidden md:flex' : 'flex'
        } w-full md:w-80 lg:w-96 flex-col border-r border-border`}
      >
        <Sidebar />
      </aside>

      {/* Main content area */}
      <main
        className={`${
          activeChat ? 'flex' : 'hidden md:flex'
        } flex-1 flex-col`}
      >
        <Outlet />
      </main>
    </div>
  );
}

export default ChatLayout;
