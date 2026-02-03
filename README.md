# Chat UI

A modern, responsive chat application built with React, TypeScript, and Vite. Features real-time messaging UI with conversation management, message grouping, and beautiful animations.

![Chat UI Preview](https://img.shields.io/badge/React-18.3-blue?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue?style=flat-square&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-5.4-purple?style=flat-square&logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-blue?style=flat-square&logo=tailwindcss)

## Features

- **Responsive Design** - Works seamlessly on desktop and mobile devices
- **Conversation Management** - Browse and search through conversations
- **Real-time Messaging** - Send and receive messages with typing indicators
- **Message Grouping** - Messages are grouped by date with timestamps
- **Auto-scroll** - Automatically scrolls to the latest message
- **Form Validation** - Empty messages are blocked using Zod validation
- **Modern UI** - Built with shadcn/ui components and Tailwind CSS
- **State Management** - Powered by Zustand for efficient state handling

## Tech Stack

| Technology      | Purpose          |
| --------------- | ---------------- |
| React 18        | UI Framework     |
| TypeScript      | Type Safety      |
| Vite            | Build Tool       |
| React Router    | Routing          |
| Zustand         | State Management |
| React Hook Form | Form Handling    |
| Zod             | Validation       |
| Tailwind CSS    | Styling          |
| shadcn/ui       | UI Components    |
| Lucide React    | Icons            |

## Project Structure

```
src/
├── components/
│   ├── chat/
│   │   ├── ChatHeader.tsx       # Chat header with user info
│   │   ├── ConversationItem.tsx # Sidebar conversation item
│   │   ├── MessageBubble.tsx    # Individual message bubble
│   │   ├── MessageInput.tsx     # Message input with validation
│   │   ├── MessageList.tsx      # Message list with grouping
│   │   ├── Sidebar.tsx          # Conversations sidebar
│   │   └── TypingIndicator.tsx  # Typing animation
│   └── ui/                      # shadcn/ui components
├── data/
│   └── mockData.ts              # Mock conversations and messages
├── layouts/
│   └── ChatLayout.tsx           # Main layout wrapper
├── lib/
│   └── utils.ts                 # Utility functions
├── pages/
│   ├── ChatView.tsx             # Chat conversation view
│   └── EmptyChat.tsx            # Empty state
├── store/
│   └── chatStore.ts             # Zustand store
├── types/
│   └── index.ts                 # TypeScript interfaces
├── App.tsx                      # App component with routes
├── main.tsx                     # Entry point
└── index.css                    # Global styles
```

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/chat-ui.git
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

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

| Command           | Description              |
| ----------------- | ------------------------ |
| `npm run dev`     | Start development server |
| `npm run build`   | Build for production     |
| `npm run preview` | Preview production build |
| `npm run lint`    | Run ESLint               |

## Routes

| Route       | Description                      |
| ----------- | -------------------------------- |
| `/`         | Home page with conversation list |
| `/chat/:id` | Individual chat conversation     |

## Key Features Explained

### Message Grouping

Messages are automatically grouped by date with headers like "Today", "Yesterday", or the actual date for older messages.

### Auto-scroll

The message list automatically scrolls to the bottom when new messages arrive, ensuring you always see the latest content.

### Form Validation

Using React Hook Form with Zod, empty messages are prevented from being sent. The validation happens in real-time with user feedback.

### Responsive Design

- On mobile: Sidebar and chat view are shown separately
- On desktop: Both are visible side by side
- Smooth transitions between views on mobile

### Typing Indicator

When you send a message, a typing indicator appears briefly before the simulated reply arrives.

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

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).
