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
  // Split the command into the executable (first whitespace-separated token)
  // and the remaining args, so we can render the verb in accent-green and the
  // arg(s) — typically a filename like `problems.md` — in text-primary.
  const trimmed = command.trim();
  const firstSpace = trimmed.indexOf(" ");
  const verb = firstSpace === -1 ? trimmed : trimmed.slice(0, firstSpace);
  const rest = firstSpace === -1 ? "" : trimmed.slice(firstSpace + 1);

  return (
    <div className="mb-8">
      <h2 className="font-mono text-lg md:text-xl">
        {heading ? <span className="sr-only">{heading}. </span> : null}
        <span aria-hidden={heading ? "true" : undefined}>
          <span className="text-accent-green">~/0to1.AI $</span>{" "}
          <span className="text-accent-green">{verb}</span>
          {rest ? (
            <>
              {" "}
              <span className="text-text-primary">{rest}</span>
            </>
          ) : null}
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
