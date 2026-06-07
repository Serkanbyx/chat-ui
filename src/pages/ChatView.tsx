import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useChatStore } from '@/store/chatStore';
import ChatHeader from '@/components/chat/ChatHeader';
import MessageList from '@/components/chat/MessageList';
import MessageInput from '@/components/chat/MessageInput';

/**
 * Chat view component for displaying a specific conversation
 * Handles routing and active chat state management
 */
function ChatView() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const setActiveChat = useChatStore((state) => state.setActiveChat);
  const getConversationById = useChatStore((state) => state.getConversationById);

  // Sync the active chat with the current route.
  // The empty state resets it, so no unmount cleanup is needed here. This
  // avoids a null -> id flicker when navigating directly between chats.
  useEffect(() => {
    if (!id) return;

    if (getConversationById(id)) {
      setActiveChat(id);
    } else {
      // Redirect to home if conversation doesn't exist
      navigate('/');
    }
  }, [id, setActiveChat, getConversationById, navigate]);

  if (!id) {
    return null;
  }

  return (
    <div className="flex h-full flex-col">
      {/* Chat header with user info */}
      <ChatHeader conversationId={id} />

      {/* Message list with auto-scroll */}
      <MessageList conversationId={id} />

      {/* Message input form */}
      <MessageInput conversationId={id} />
    </div>
  );
}

export default ChatView;
