interface TerminalWindowProps {
  filename?: string;
  children: React.ReactNode;
  className?: string;
}

export default function TerminalWindow({ filename, children, className = "" }: TerminalWindowProps) {
  return (
    <div className={`rounded-lg border border-border-terminal bg-bg-surface overflow-hidden ${className}`}>
      <div className="flex items-center gap-2 px-4 py-3 border-b border-border-terminal">
        <span className="w-3 h-3 rounded-full bg-[#FF5F56]" aria-hidden="true" />
        <span className="w-3 h-3 rounded-full bg-[#FFBD2E]" aria-hidden="true" />
        <span className="w-3 h-3 rounded-full bg-[#27C93F]" aria-hidden="true" />
        {filename && (
          <span className="ml-2 text-sm font-mono text-text-dim">{filename}</span>
        )}
      </div>
      <div className="p-6">
        {children}
      </div>
    </div>
  );
}
