interface TerminalPromptProps {
  command: string;
  /**
   * Descriptive section heading for screen readers and search crawlers.
   * Rendered visually-hidden inside the <h2> so sighted users still see
   * the terminal-chrome command while the semantic heading is preserved.
   */
  heading?: string;
}

export default function TerminalPrompt({
  command,
  heading,
}: TerminalPromptProps) {
  return (
    <h2 className="font-mono text-lg md:text-xl mb-8">
      {heading ? <span className="sr-only">{heading}. </span> : null}
      <span aria-hidden={heading ? "true" : undefined}>
        <span className="text-accent-green">~/brad $</span>{" "}
        <span className="text-text-primary">{command}</span>
      </span>
    </h2>
  );
}
