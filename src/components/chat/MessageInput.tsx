import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Send, Paperclip, Smile } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useChatStore } from '@/store/chatStore';
import { MessageFormData } from '@/types';

/**
 * Zod schema for message validation
 * Ensures message is not empty or whitespace-only
 */
const messageSchema = z.object({
  content: z
    .string()
    .min(1, 'Message cannot be empty')
    .refine((val) => val.trim().length > 0, {
      message: 'Message cannot be empty',
    }),
});

interface MessageInputProps {
  conversationId: string;
}

/**
 * Message input component with form validation
 * Uses React Hook Form with Zod validation
 */
function MessageInput({ conversationId }: MessageInputProps) {
  const { sendMessage } = useChatStore();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<MessageFormData>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      content: '',
    },
  });

  /**
   * Handle form submission
   */
  const onSubmit = (data: MessageFormData) => {
    const trimmedContent = data.content.trim();
    if (trimmedContent) {
      sendMessage(conversationId, trimmedContent);
      reset();
    }
  };

  /**
   * Handle Enter key press (submit on Enter, new line on Shift+Enter)
   */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(onSubmit)();
    }
  };

  return (
    <div className="border-t border-border p-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto flex max-w-3xl items-center gap-2"
      >
        {/* Attachment button */}
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="shrink-0 text-muted-foreground hover:text-foreground"
          aria-label="Add attachment"
        >
          <Paperclip className="h-5 w-5" />
        </Button>

        {/* Message input */}
        <div className="relative flex-1">
          <Input
            {...register('content')}
            placeholder="Type a message..."
            onKeyDown={handleKeyDown}
            autoComplete="off"
            className={`pr-10 ${errors.content ? 'border-destructive focus-visible:ring-destructive' : ''}`}
            aria-invalid={errors.content ? 'true' : 'false'}
          />
          {/* Emoji button */}
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1/2 h-8 w-8 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            aria-label="Add emoji"
          >
            <Smile className="h-5 w-5" />
          </Button>
        </div>

        {/* Send button */}
        <Button
          type="submit"
          size="icon"
          disabled={isSubmitting}
          className="shrink-0"
          aria-label="Send message"
        >
          <Send className="h-5 w-5" />
        </Button>
      </form>

      {/* Error message */}
      {errors.content && (
        <p className="mt-2 text-center text-sm text-destructive" role="alert">
          {errors.content.message}
        </p>
      )}
    </div>
  );
}

export default MessageInput;
