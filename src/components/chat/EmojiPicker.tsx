import { useEffect, useRef, useState } from 'react';
import { Smile } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EmojiPickerProps {
  onSelect: (emoji: string) => void;
}

const EMOJIS = [
  '😀', '😂', '😍', '😎', '🤔', '😢', '😡', '👍',
  '👏', '🙏', '🎉', '❤️', '🔥', '✨', '💯', '🚀',
  '😅', '😴', '🤯', '🥳', '😇', '🤝', '👀', '💡',
];

/**
 * Lightweight, dependency-free emoji picker.
 * Opens a small grid of emojis and reports the selected one to the parent.
 */
function EmojiPicker({ onSelect }: EmojiPickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  const handleSelect = (emoji: string) => {
    onSelect(emoji);
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className="relative">
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen((prev) => !prev)}
        className="h-8 w-8 text-muted-foreground hover:text-foreground"
        aria-label="Add emoji"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <Smile className="h-5 w-5" />
      </Button>

      {isOpen && (
        <div
          className="absolute bottom-10 right-0 z-10 w-56 rounded-lg border border-border bg-popover p-2 shadow-lg animate-fade-in"
          role="menu"
        >
          <div className="grid grid-cols-8 gap-1">
            {EMOJIS.map((emoji) => (
              <button
                key={emoji}
                type="button"
                onClick={() => handleSelect(emoji)}
                className="flex h-7 w-7 items-center justify-center rounded text-lg transition-colors hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring"
                aria-label={`Insert ${emoji}`}
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default EmojiPicker;
