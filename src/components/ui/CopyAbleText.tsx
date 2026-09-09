import { useState } from "react";
import { Copy, Check } from "lucide-react";

interface CopyableTextProps {
  text: string;
  className?: string;
}

export const CopyableText = ({
  text,
  className = "",
}: CopyableTextProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1500);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={`relative px-2 py-1 border border-border rounded-lg  inline-flex items-center gap-2 group ${className}`}
    >
      <span>{text}</span>

      {copied ? (
        <span className="absolute left-0 -bottom-5 ml-2 text-sm font-medium text-green-600 flex items-center gap-1 whitespace-nowrap">
          <Check className="w-4 h-4" />
          Copied
        </span>
      ) : (
        <Copy className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
      )}
    </button>
  );
}