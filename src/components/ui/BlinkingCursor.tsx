export default function BlinkingCursor() {
  return (
    <span
      className="cursor-blink inline-block w-[2px] h-[1em] bg-accent-green ml-1 align-text-bottom"
      aria-hidden="true"
    />
  );
}
