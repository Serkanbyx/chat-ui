/**
 * Represents a user in the chat system
 */
export interface User {
  id: string;
  name: string;
  avatar?: string;
  isOnline?: boolean;
}

/**
 * Represents a single message in a conversation
 */
export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  timestamp: Date;
  isRead?: boolean;
}

/**
 * Represents a conversation between users
 */
export interface Conversation {
  id: string;
  participants: User[];
  lastMessage?: Message;
  unreadCount: number;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Message form data structure
 */
export interface MessageFormData {
  content: string;
}

/**
 * Grouped messages by date for display
 */
export interface MessageGroup {
  date: Date;
  messages: Message[];
}
