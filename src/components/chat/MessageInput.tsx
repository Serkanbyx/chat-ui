import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Send, Paperclip } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useChatStore } from '@/store/chatStore';
import { MessageFormData } from '@/types';
import EmojiPicker from './EmojiPicker';

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

const MAX_TEXTAREA_HEIGHT = 120;

/**
 * Message input component with form validation
 * Uses React Hook Form with Zod validation and a multiline textarea
 */
function MessageInput({ conversationId }: MessageInputProps) {
  const sendMessage = useChatStore((state) => state.sendMessage);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    getValues,
    setFocus,
    formState: { errors, isSubmitting },
  } = useForm<MessageFormData>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      content: '',
    },
  });

  const { ref: contentRef, onChange: onContentChange, ...contentField } =
    register('content');

  /**
   * Resets the textarea height back to a single row.
   */
  const resetTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  /**
   * Grows the textarea with its content up to a maximum height.
   */
  const autoResize = (element: HTMLTextAreaElement) => {
    element.style.height = 'auto';
    element.style.height = `${Math.min(element.scrollHeight, MAX_TEXTAREA_HEIGHT)}px`;
  };

  /**
   * Handle form submission
   */
  const onSubmit = (data: MessageFormData) => {
    const trimmedContent = data.content.trim();
    if (trimmedContent) {
      sendMessage(conversationId, trimmedContent);
      reset();
      resetTextareaHeight();
    }
  };

  /**
   * Submit on Enter, insert a new line on Shift+Enter
   */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(onSubmit)();
    }
  };

  /**
   * Appends the selected emoji to the current message.
   */
  const handleEmojiSelect = (emoji: string) => {
    const current = getValues('content');
    setValue('content', `${current}${emoji}`, { shouldValidate: true });
    setFocus('content');
    if (textareaRef.current) {
      autoResize(textareaRef.current);
    }
  };

  return (
    <div className="border-t border-border p-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto flex max-w-3xl items-end gap-2"
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
          <Textarea
            {...contentField}
            ref={(element) => {
              contentRef(element);
              textareaRef.current = element;
            }}
            rows={1}
            placeholder="Type a message..."
            onChange={(e) => {
              onContentChange(e);
              autoResize(e.target);
            }}
            onKeyDown={handleKeyDown}
            autoComplete="off"
            className={`max-h-[120px] resize-none pr-12 ${
              errors.content ? 'border-destructive focus-visible:ring-destructive' : ''
            }`}
            aria-invalid={errors.content ? 'true' : 'false'}
          />
          {/* Emoji picker */}
          <div className="absolute bottom-1 right-1">
            <EmojiPicker onSelect={handleEmojiSelect} />
          </div>
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
