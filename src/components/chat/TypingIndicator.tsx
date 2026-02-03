/**
 * Typing indicator component
 * Shows animated dots when the other user is typing
 */
function TypingIndicator() {
  return (
    <div className="flex justify-start">
      <div className="rounded-2xl rounded-bl-md bg-muted px-4 py-3">
        <div className="flex items-center gap-1">
          <span
            className="h-2 w-2 animate-bounce-dots rounded-full bg-muted-foreground/60"
            style={{ animationDelay: '0s' }}
          />
          <span
            className="h-2 w-2 animate-bounce-dots rounded-full bg-muted-foreground/60"
            style={{ animationDelay: '0.16s' }}
          />
          <span
            className="h-2 w-2 animate-bounce-dots rounded-full bg-muted-foreground/60"
            style={{ animationDelay: '0.32s' }}
          />
        </div>
      </div>
    </div>
  );
}

export default TypingIndicator;
