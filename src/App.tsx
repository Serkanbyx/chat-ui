import { Routes, Route, Navigate } from 'react-router-dom';
import ChatLayout from '@/layouts/ChatLayout';
import ChatView from '@/pages/ChatView';
import EmptyChat from '@/pages/EmptyChat';

/**
 * Main application component with routing configuration
 * Routes: / (chat layout), /chat/:id (specific conversation)
 */
function App() {
  return (
    <Routes>
      <Route path="/" element={<ChatLayout />}>
        <Route index element={<EmptyChat />} />
        <Route path="chat/:id" element={<ChatView />} />
      </Route>
      {/* Redirect any unknown routes to home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
