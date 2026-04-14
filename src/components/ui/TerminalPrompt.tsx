interface TerminalPromptProps {
  command: string;
}

export default function TerminalPrompt({ command }: TerminalPromptProps) {
  return (
    <h2 className="font-mono text-lg md:text-xl mb-8">
      <span className="text-accent-green">~/brad $</span>{" "}
      <span className="text-text-primary">{command}</span>
    </h2>
  );
}
