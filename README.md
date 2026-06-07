# 💬 Chat UI

A modern, responsive chat application built with React, TypeScript, and Vite. Experience real-time messaging with conversation management, message grouping, beautiful animations, and a polished user interface.

[![Created by Serkanby](https://img.shields.io/badge/Created%20by-Serkanby-blue?style=flat-square)](https://serkanbayraktar.com/)
[![GitHub](https://img.shields.io/badge/GitHub-Serkanbyx-181717?style=flat-square&logo=github)](https://github.com/Serkanbyx)
![React](https://img.shields.io/badge/React-18.3-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?style=flat-square&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?style=flat-square&logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4?style=flat-square&logo=tailwindcss)

## Features

- **Responsive Design** - Seamlessly adapts to desktop and mobile devices with optimized layouts
- **Dark Mode** - Toggle between light and dark themes with preference persisted to localStorage
- **Conversation Management** - Browse, search, and manage multiple chat conversations
- **Real-Time Messaging** - Send and receive messages with typing indicators and auto-replies
- **Multiline Composer** - Auto-growing message input with Enter to send and Shift+Enter for new lines
- **Emoji Picker** - Insert emojis from a lightweight, dependency-free picker
- **Message Grouping** - Messages intelligently grouped by date (Today, Yesterday, or actual date)
- **Read Receipts** - Single check for delivered messages and double check once they are read
- **Auto-Scroll** - Automatically scrolls to the latest message for seamless conversation flow
- **Form Validation** - Robust input validation using React Hook Form and Zod
- **Online Status** - Visual indicators showing user availability status
- **Unread Badges** - Track unread messages with visual notification badges
- **Modern UI Components** - Built with shadcn/ui and Radix UI primitives
- **Efficient State Management** - Powered by Zustand with fine-grained selectors for optimal performance

## Live Demo

[🎮 View Live Demo](https://chat-uiii.netlify.app/)

## Technologies

- **React 18** - Modern UI framework with hooks and concurrent features
- **TypeScript** - Full type safety for robust, maintainable code
- **Vite** - Lightning-fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework for rapid styling
- **Zustand** - Lightweight state management solution
- **React Hook Form** - Performant form handling with minimal re-renders
- **Zod** - TypeScript-first schema validation
- **React Router DOM** - Declarative routing for React applications
- **shadcn/ui** - High-quality, accessible UI components
- **Radix UI** - Unstyled, accessible component primitives
- **Lucide React** - Beautiful, consistent icon library

## Installation

### Prerequisites

- Node.js 18 or higher
- npm or yarn package manager

### Local Development

1. Clone the repository:

```bash
git clone https://github.com/Serkanbyx/chat-ui.git
cd chat-ui
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

### Available Scripts

| Command           | Description                 |
| ----------------- | --------------------------- |
| `npm run dev`     | Start development server    |
| `npm run build`   | Build for production        |
| `npm run preview` | Preview production build    |
| `npm run lint`    | Run ESLint for code quality |

## Usage

1. **Browse Conversations** - View all your conversations in the sidebar
2. **Select a Chat** - Click on any conversation to open the chat view
3. **Send Messages** - Type your message and press Enter or click Send
4. **View Responses** - Watch the typing indicator and receive simulated replies
5. **Switch Conversations** - Navigate between different chats seamlessly

## How It Works?

### State Management with Zustand

The application uses Zustand for centralized state management:

```typescript
const useChatStore = create<ChatState>((set, get) => ({
  conversations: mockConversations,
  messages: mockMessages,
  activeChat: null,
  isTyping: false,
  // Actions for state updates
  sendMessage: (conversationId, content) => {
    /* ... */
  },
  markAsRead: (conversationId) => {
    /* ... */
  },
}));
```

### Message Grouping

Messages are automatically grouped by date with intelligent headers:

- **Today** - Messages sent today
- **Yesterday** - Messages from yesterday
- **Date Format** - Actual date for older messages

### Form Validation

Using React Hook Form with Zod schema validation:

```typescript
const messageSchema = z.object({
  content: z.string().min(1, "Message cannot be empty"),
});
```

### Responsive Layout

- **Mobile View** - Sidebar and chat view displayed separately with smooth transitions
- **Desktop View** - Side-by-side layout showing both sidebar and active chat

### Dark Mode

The theme is managed by a dedicated Zustand store with the `persist` middleware:

```typescript
const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: "light",
      toggleTheme: () =>
        set((state) => ({ theme: state.theme === "light" ? "dark" : "light" })),
    }),
    { name: "chat-ui-theme" }
  )
);
```

The selected theme is saved to `localStorage` and applied to the document root before paint, so there is no flash of the wrong theme on reload.

## Project Structure

```
src/
├── components/
│   ├── chat/
│   │   ├── ChatHeader.tsx       # Chat header with user info
│   │   ├── ConversationItem.tsx # Sidebar conversation item
│   │   ├── EmojiPicker.tsx      # Dependency-free emoji picker
│   │   ├── MessageBubble.tsx    # Individual message bubble
│   │   ├── MessageInput.tsx     # Multiline message input with validation
│   │   ├── MessageList.tsx      # Message list with grouping
│   │   ├── Sidebar.tsx          # Conversations sidebar
│   │   └── TypingIndicator.tsx  # Typing animation
│   └── ui/                      # shadcn/ui components (button, input, textarea, ...)
├── data/
│   └── mockData.ts              # Mock conversations and messages
├── hooks/
│   └── useApplyTheme.ts         # Syncs the theme with the document root
├── layouts/
│   └── ChatLayout.tsx           # Main layout wrapper
├── lib/
│   └── utils.ts                 # Utility functions
├── pages/
│   ├── ChatView.tsx             # Chat conversation view
│   └── EmptyChat.tsx            # Empty state
├── store/
│   ├── chatStore.ts             # Zustand chat store
│   └── themeStore.ts            # Persisted theme store
├── types/
│   └── index.ts                 # TypeScript interfaces
├── App.tsx                      # App component with routes
├── main.tsx                     # Entry point
└── index.css                    # Global styles
```

## Build Guide

A step-by-step playbook used to build this project from scratch is available at [docs/build-guide.md](docs/build-guide.md). It documents the phases, architecture, reusable patterns, and common pitfalls.

## Routes

| Route       | Description                      |
| ----------- | -------------------------------- |
| `/`         | Home page with conversation list |
| `/chat/:id` | Individual chat conversation     |

## Customization

### Add New Mock Users

Edit `src/data/mockData.ts` to add new users:

```typescript
export const mockUsers: User[] = [
  {
    id: "user-new",
    name: "New User",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=NewUser",
    isOnline: true,
  },
  // ... existing users
];
```

### Change Auto-Reply Messages

Customize the simulated replies in `src/store/chatStore.ts`:

```typescript
const replyMessages = [
  "That's interesting! Tell me more.",
  "I see what you mean.",
  "Thanks for sharing!",
  // Add your custom replies here
];
```

### Modify Theme Colors

Update the color scheme in `tailwind.config.js` and `src/index.css` for custom themes.

## Features in Detail

### Completed Features

✅ Responsive sidebar with conversation list  
✅ Dark mode toggle with persisted preference  
✅ Real-time message sending and receiving  
✅ Multiline composer (Enter to send, Shift+Enter for new line)  
✅ Emoji picker  
✅ Typing indicator animation  
✅ Message grouping by date  
✅ Read receipts (delivered / read)  
✅ Auto-scroll to latest message  
✅ Online/offline status indicators  
✅ Unread message badges  
✅ Form validation with error handling  
✅ Mobile-friendly navigation

### Future Features

- [ ] Message search functionality
- [ ] File and image sharing
- [ ] Group conversations
- [ ] Message reactions (emoji)
- [ ] Message editing and deletion
- [ ] Real-time backend integration

## Deployment

This project is configured for deployment on Netlify.

### Deploy to Netlify

1. Push your code to GitHub
2. Connect your repository to Netlify
3. Netlify will auto-detect the build settings from `netlify.toml`
4. Deploy!

Or use the Netlify CLI:

```bash
npm install -g netlify-cli
netlify deploy --prod
```

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes using conventional commits:
   - `feat:` - New features
   - `fix:` - Bug fixes
   - `refactor:` - Code refactoring
   - `docs:` - Documentation updates
   - `chore:` - Maintenance tasks
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Developer

**Serkan Bayraktar**

- Website: [serkanbayraktar.com](https://serkanbayraktar.com)
- GitHub: [@Serkanbyx](https://github.com/Serkanbyx)
- Email: serkanbyx1@gmail.com

## Contact

- For bug reports and feature requests, please [open an issue](https://github.com/Serkanbyx/chat-ui/issues)
- For direct communication: serkanbyx1@gmail.com
- Visit: [serkanbayraktar.com](https://serkanbayraktar.com)

---

⭐ If you like this project, don't forget to give it a star!
