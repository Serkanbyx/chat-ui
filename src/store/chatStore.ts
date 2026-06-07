import { create } from 'zustand';
import { Conversation, Message, User } from '@/types';
import { generateId } from '@/lib/utils';
import { mockConversations, mockMessages, currentUser, mockUsers } from '@/data/mockData';

/**
 * Chat store state interface
 */
interface ChatState {
  // State
  conversations: Conversation[];
  messages: Record<string, Message[]>; // Keyed by conversationId
  activeChat: string | null;
  currentUser: User;
  users: User[];
  isTyping: boolean;

  // Actions
  setActiveChat: (conversationId: string | null) => void;
  sendMessage: (conversationId: string, content: string) => void;
  markAsRead: (conversationId: string) => void;
  setIsTyping: (isTyping: boolean) => void;
  getConversationMessages: (conversationId: string) => Message[];
  getConversationById: (conversationId: string) => Conversation | undefined;
  getOtherParticipant: (conversation: Conversation) => User | undefined;
}

/**
 * Zustand store for chat state management
 * Handles conversations, messages, and active chat state
 */
export const useChatStore = create<ChatState>((set, get) => ({
  // Initial state from mock data
  conversations: mockConversations,
  messages: mockMessages,
  activeChat: null,
  currentUser: currentUser,
  users: mockUsers,
  isTyping: false,

  /**
   * Sets the currently active chat conversation
   */
  setActiveChat: (conversationId) => {
    set({ activeChat: conversationId });
    if (conversationId) {
      get().markAsRead(conversationId);
    }
  },

  /**
   * Sends a new message in a conversation
   */
  sendMessage: (conversationId, content) => {
    const { currentUser, messages, conversations } = get();
    const timestamp = new Date();

    // Create new message (starts as delivered, marked read once the recipient replies)
    const newMessage: Message = {
      id: generateId(),
      conversationId,
      senderId: currentUser.id,
      content,
      timestamp,
      isRead: false,
    };

    // Update messages
    const conversationMessages = messages[conversationId] || [];
    const updatedMessages = {
      ...messages,
      [conversationId]: [...conversationMessages, newMessage],
    };

    // Update conversation's lastMessage and updatedAt
    const updatedConversations = conversations.map((conv) =>
      conv.id === conversationId
        ? { ...conv, lastMessage: newMessage, updatedAt: timestamp }
        : conv
    );

    // Sort conversations by updatedAt (most recent first)
    updatedConversations.sort(
      (a, b) => b.updatedAt.getTime() - a.updatedAt.getTime()
    );

    set({
      messages: updatedMessages,
      conversations: updatedConversations,
    });

    // Simulate typing indicator and reply after a delay
    set({ isTyping: true });
    setTimeout(() => {
      set({ isTyping: false });
      
      // Simulate a reply
      const replyMessages = [
        "That's interesting! Tell me more.",
        "I see what you mean.",
        "Thanks for sharing!",
        "Got it! 👍",
        "Sounds good to me!",
        "Let me think about that...",
        "Absolutely agree!",
      ];
      
      const replyContent = replyMessages[Math.floor(Math.random() * replyMessages.length)];
      const conversation = get().conversations.find((c) => c.id === conversationId);
      const otherParticipant = conversation?.participants.find(
        (p) => p.id !== currentUser.id
      );

      if (otherParticipant) {
        const replyMessage: Message = {
          id: generateId(),
          conversationId,
          senderId: otherParticipant.id,
          content: replyContent,
          timestamp: new Date(),
          isRead: false,
        };

        const currentMessages = get().messages;
        const currentConversations = get().conversations;

        // The recipient replied, so their previous messages are now considered read.
        const conversationHistory = (currentMessages[conversationId] || []).map(
          (msg) =>
            msg.senderId === currentUser.id && !msg.isRead
              ? { ...msg, isRead: true }
              : msg
        );

        set({
          messages: {
            ...currentMessages,
            [conversationId]: [...conversationHistory, replyMessage],
          },
          conversations: currentConversations.map((conv) =>
            conv.id === conversationId
              ? { ...conv, lastMessage: replyMessage, updatedAt: new Date() }
              : conv
          ),
        });
      }
    }, 1500 + Math.random() * 1000);
  },

  /**
   * Marks all messages in a conversation as read
   */
  markAsRead: (conversationId) => {
    const { conversations, messages } = get();

    // Update conversation unread count
    const updatedConversations = conversations.map((conv) =>
      conv.id === conversationId ? { ...conv, unreadCount: 0 } : conv
    );

    // Mark all messages as read
    const conversationMessages = messages[conversationId] || [];
    const updatedMessages = {
      ...messages,
      [conversationId]: conversationMessages.map((msg) => ({
        ...msg,
        isRead: true,
      })),
    };

    set({
      conversations: updatedConversations,
      messages: updatedMessages,
    });
  },

  /**
   * Sets the typing indicator state
   */
  setIsTyping: (isTyping) => set({ isTyping }),

  /**
   * Gets all messages for a specific conversation
   */
  getConversationMessages: (conversationId) => {
    return get().messages[conversationId] || [];
  },

  /**
   * Gets a conversation by its ID
   */
  getConversationById: (conversationId) => {
    return get().conversations.find((conv) => conv.id === conversationId);
  },

  /**
   * Gets the other participant in a conversation (not current user)
   */
  getOtherParticipant: (conversation) => {
    const { currentUser } = get();
    return conversation.participants.find((p) => p.id !== currentUser.id);
  },
}));
