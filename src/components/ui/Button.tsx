interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "secondary";
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export default function Button({
  children,
  href,
  variant = "primary",
  className = "",
  onClick,
  type = "button",
  disabled = false,
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center px-6 py-3 rounded-lg font-mono text-sm font-semibold transition-all duration-200 min-h-[44px] min-w-[44px] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100";
  const variants = {
    primary:
      "bg-accent-green text-bg-primary hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(74,222,128,0.3)]",
    secondary:
      "border border-border-terminal text-text-primary hover:border-accent-green hover:text-accent-green",
  };

  const classes = `${base} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <a href={href} className={classes} onClick={onClick}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} onClick={onClick} type={type} disabled={disabled}>
      {children}
    </button>
  );
}
