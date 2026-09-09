interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export function Modal({
  open,
  onClose,
  title,
  children,
  footer,
}: ModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative bg-card border border-border rounded-2xl shadow-2xl w-full max-w-md max-h-[80vh] z-10 flex flex-col">
        <div className="flex items-center justify-between p-5 border-b border-border shrink-0">
          <h3 className="font-semibold font-display text-secondary-foreground">
            {title}
          </h3>

          <button
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center rounded-lg text-muted-foreground hover:bg-secondary transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="p-5 overflow-y-auto">
          {children}
        </div>

        {footer && (
          <div className="flex gap-2 p-5 pt-0 shrink-0">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
