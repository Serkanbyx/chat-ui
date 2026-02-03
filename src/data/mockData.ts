import { User, Conversation, Message } from '@/types';

/**
 * Current logged-in user
 */
export const currentUser: User = {
  id: 'user-1',
  name: 'John Doe',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
  isOnline: true,
};

/**
 * Mock users for the chat application
 */
export const mockUsers: User[] = [
  currentUser,
  {
    id: 'user-2',
    name: 'Sarah Wilson',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    isOnline: true,
  },
  {
    id: 'user-3',
    name: 'Mike Johnson',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike',
    isOnline: false,
  },
  {
    id: 'user-4',
    name: 'Emily Davis',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily',
    isOnline: true,
  },
  {
    id: 'user-5',
    name: 'Alex Turner',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
    isOnline: false,
  },
  {
    id: 'user-6',
    name: 'Jessica Brown',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jessica',
    isOnline: true,
  },
];

// Helper to create dates relative to now
const daysAgo = (days: number, hours = 0, minutes = 0): Date => {
  const date = new Date();
  date.setDate(date.getDate() - days);
  date.setHours(date.getHours() - hours, minutes, 0, 0);
  return date;
};

/**
 * Mock messages organized by conversation ID
 */
export const mockMessages: Record<string, Message[]> = {
  'conv-1': [
    {
      id: 'msg-1-1',
      conversationId: 'conv-1',
      senderId: 'user-2',
      content: 'Hey! How are you doing today?',
      timestamp: daysAgo(0, 3, 30),
      isRead: true,
    },
    {
      id: 'msg-1-2',
      conversationId: 'conv-1',
      senderId: 'user-1',
      content: "Hi Sarah! I'm doing great, thanks for asking. How about you?",
      timestamp: daysAgo(0, 3, 25),
      isRead: true,
    },
    {
      id: 'msg-1-3',
      conversationId: 'conv-1',
      senderId: 'user-2',
      content: "Pretty good! Just finished a big project at work. Finally got some free time! 🎉",
      timestamp: daysAgo(0, 3, 20),
      isRead: true,
    },
    {
      id: 'msg-1-4',
      conversationId: 'conv-1',
      senderId: 'user-1',
      content: "That's awesome! Congratulations! We should celebrate sometime.",
      timestamp: daysAgo(0, 3, 15),
      isRead: true,
    },
    {
      id: 'msg-1-5',
      conversationId: 'conv-1',
      senderId: 'user-2',
      content: "Definitely! Are you free this weekend? We could grab coffee or something.",
      timestamp: daysAgo(0, 2, 0),
      isRead: true,
    },
    {
      id: 'msg-1-6',
      conversationId: 'conv-1',
      senderId: 'user-1',
      content: "Saturday works for me! How about that new café downtown?",
      timestamp: daysAgo(0, 1, 45),
      isRead: true,
    },
    {
      id: 'msg-1-7',
      conversationId: 'conv-1',
      senderId: 'user-2',
      content: "Perfect! I've heard great things about their pastries. Let's meet at 2pm?",
      timestamp: daysAgo(0, 1, 30),
      isRead: false,
    },
  ],
  'conv-2': [
    {
      id: 'msg-2-1',
      conversationId: 'conv-2',
      senderId: 'user-3',
      content: 'Did you see the game last night?',
      timestamp: daysAgo(1, 5, 0),
      isRead: true,
    },
    {
      id: 'msg-2-2',
      conversationId: 'conv-2',
      senderId: 'user-1',
      content: 'Yes! What an incredible match! That last-minute goal was unbelievable.',
      timestamp: daysAgo(1, 4, 55),
      isRead: true,
    },
    {
      id: 'msg-2-3',
      conversationId: 'conv-2',
      senderId: 'user-3',
      content: "I know right! I couldn't believe my eyes. Best game of the season!",
      timestamp: daysAgo(1, 4, 50),
      isRead: true,
    },
    {
      id: 'msg-2-4',
      conversationId: 'conv-2',
      senderId: 'user-1',
      content: 'We should watch the next one together!',
      timestamp: daysAgo(1, 4, 45),
      isRead: true,
    },
    {
      id: 'msg-2-5',
      conversationId: 'conv-2',
      senderId: 'user-3',
      content: "Sounds like a plan! I'll bring the snacks 🍕",
      timestamp: daysAgo(1, 4, 40),
      isRead: true,
    },
  ],
  'conv-3': [
    {
      id: 'msg-3-1',
      conversationId: 'conv-3',
      senderId: 'user-4',
      content: "Hi! I saw your portfolio and I'm really impressed with your work.",
      timestamp: daysAgo(2, 8, 0),
      isRead: true,
    },
    {
      id: 'msg-3-2',
      conversationId: 'conv-3',
      senderId: 'user-1',
      content: "Thank you so much! That means a lot to me. Which project caught your attention?",
      timestamp: daysAgo(2, 7, 30),
      isRead: true,
    },
    {
      id: 'msg-3-3',
      conversationId: 'conv-3',
      senderId: 'user-4',
      content: 'The e-commerce dashboard you built was amazing. Love the attention to detail!',
      timestamp: daysAgo(2, 7, 0),
      isRead: true,
    },
    {
      id: 'msg-3-4',
      conversationId: 'conv-3',
      senderId: 'user-1',
      content: "Thanks! That was a challenging project but really fun to work on.",
      timestamp: daysAgo(2, 6, 45),
      isRead: true,
    },
    {
      id: 'msg-3-5',
      conversationId: 'conv-3',
      senderId: 'user-4',
      content: "Would you be interested in collaborating on something similar?",
      timestamp: daysAgo(2, 6, 30),
      isRead: false,
    },
  ],
  'conv-4': [
    {
      id: 'msg-4-1',
      conversationId: 'conv-4',
      senderId: 'user-1',
      content: 'Hey Alex, do you have time to review my PR?',
      timestamp: daysAgo(3, 10, 0),
      isRead: true,
    },
    {
      id: 'msg-4-2',
      conversationId: 'conv-4',
      senderId: 'user-5',
      content: "Sure thing! I'll take a look this afternoon.",
      timestamp: daysAgo(3, 9, 30),
      isRead: true,
    },
    {
      id: 'msg-4-3',
      conversationId: 'conv-4',
      senderId: 'user-5',
      content: 'Just finished reviewing. Left a few comments but overall looks great! 👍',
      timestamp: daysAgo(3, 5, 0),
      isRead: true,
    },
    {
      id: 'msg-4-4',
      conversationId: 'conv-4',
      senderId: 'user-1',
      content: "Thanks for the quick turnaround! I'll address the comments now.",
      timestamp: daysAgo(3, 4, 45),
      isRead: true,
    },
  ],
  'conv-5': [
    {
      id: 'msg-5-1',
      conversationId: 'conv-5',
      senderId: 'user-6',
      content: "Don't forget about the team meeting tomorrow at 10am!",
      timestamp: daysAgo(0, 5, 0),
      isRead: true,
    },
    {
      id: 'msg-5-2',
      conversationId: 'conv-5',
      senderId: 'user-1',
      content: "Thanks for the reminder! I've added it to my calendar.",
      timestamp: daysAgo(0, 4, 45),
      isRead: true,
    },
    {
      id: 'msg-5-3',
      conversationId: 'conv-5',
      senderId: 'user-6',
      content: 'Great! Also, can you prepare a quick update on the new feature?',
      timestamp: daysAgo(0, 4, 30),
      isRead: true,
    },
    {
      id: 'msg-5-4',
      conversationId: 'conv-5',
      senderId: 'user-1',
      content: "Sure, I'll have a summary ready. Should I include the mockups too?",
      timestamp: daysAgo(0, 4, 15),
      isRead: true,
    },
    {
      id: 'msg-5-5',
      conversationId: 'conv-5',
      senderId: 'user-6',
      content: "Yes please! That would be really helpful for the discussion.",
      timestamp: daysAgo(0, 4, 0),
      isRead: false,
    },
  ],
};

/**
 * Mock conversations
 */
export const mockConversations: Conversation[] = [
  {
    id: 'conv-1',
    participants: [currentUser, mockUsers[1]],
    lastMessage: mockMessages['conv-1'][mockMessages['conv-1'].length - 1],
    unreadCount: 1,
    createdAt: daysAgo(7),
    updatedAt: daysAgo(0, 1, 30),
  },
  {
    id: 'conv-5',
    participants: [currentUser, mockUsers[5]],
    lastMessage: mockMessages['conv-5'][mockMessages['conv-5'].length - 1],
    unreadCount: 1,
    createdAt: daysAgo(3),
    updatedAt: daysAgo(0, 4, 0),
  },
  {
    id: 'conv-2',
    participants: [currentUser, mockUsers[2]],
    lastMessage: mockMessages['conv-2'][mockMessages['conv-2'].length - 1],
    unreadCount: 0,
    createdAt: daysAgo(14),
    updatedAt: daysAgo(1, 4, 40),
  },
  {
    id: 'conv-3',
    participants: [currentUser, mockUsers[3]],
    lastMessage: mockMessages['conv-3'][mockMessages['conv-3'].length - 1],
    unreadCount: 1,
    createdAt: daysAgo(5),
    updatedAt: daysAgo(2, 6, 30),
  },
  {
    id: 'conv-4',
    participants: [currentUser, mockUsers[4]],
    lastMessage: mockMessages['conv-4'][mockMessages['conv-4'].length - 1],
    unreadCount: 0,
    createdAt: daysAgo(10),
    updatedAt: daysAgo(3, 4, 45),
  },
];
