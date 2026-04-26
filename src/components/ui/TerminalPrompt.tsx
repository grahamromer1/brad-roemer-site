interface TerminalPromptProps {
  command: string;
  /**
   * Descriptive section heading for screen readers and search crawlers.
   * Rendered visually-hidden inside the <h2> so sighted users still see
   * the terminal-chrome command while the semantic heading is preserved.
   */
  heading?: string;
  /**
   * Optional plain-language subheader rendered visibly below the command
   * line. Intended to help visitors scan the page without having to parse
   * the terminal styling.
   */
  subheading?: string;
}

export default function TerminalPrompt({
  command,
  heading,
  subheading,
}: TerminalPromptProps) {
  return (
    <div className="mb-8">
      <h2 className="font-mono text-lg md:text-xl">
        {heading ? <span className="sr-only">{heading}. </span> : null}
        <span aria-hidden={heading ? "true" : undefined}>
          <span className="text-accent-green">~/0to1.AI $</span>{" "}
          <span className="text-text-primary">{command}</span>
        </span>
      </h2>
      {subheading ? (
        <p className="font-sans text-sm md:text-base text-text-dim mt-2">
          {subheading}
        </p>
      ) : null}
    </div>
  );
}
