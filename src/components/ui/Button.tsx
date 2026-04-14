interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "secondary";
  className?: string;
  onClick?: () => void;
}

export default function Button({ children, href, variant = "primary", className = "", onClick }: ButtonProps) {
  const base = "inline-flex items-center justify-center px-6 py-3 rounded-lg font-mono text-sm font-semibold transition-all duration-200 min-h-[44px] min-w-[44px]";
  const variants = {
    primary: "bg-accent-green text-bg-primary hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(74,222,128,0.3)]",
    secondary: "border border-border-terminal text-text-primary hover:border-accent-green hover:text-accent-green",
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
    <button className={classes} onClick={onClick}>
      {children}
    </button>
  );
}
