import Link from "next/link";

type ButtonVariant = "solid" | "outlined" | "whatsapp";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: ButtonVariant;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  className?: string;
  ariaLabel?: string;
  external?: boolean;
}

const variants: Record<ButtonVariant, string> = {
  solid: "bg-gradient-to-br from-accent to-accent-dark text-black hover:brightness-110",
  outlined: "border border-accent text-accent hover:bg-accent hover:text-black",
  whatsapp: "bg-whatsapp text-white hover:brightness-110",
};

export function Button({ children, href, variant = "solid", onClick, type = "button", disabled = false, className = "", ariaLabel, external = false }: ButtonProps) {
  const baseClasses = `inline-flex items-center justify-center gap-2 rounded-pill px-8 py-4 font-body text-label font-semibold uppercase tracking-widest transition-all duration-300 ${variants[variant]} ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`;

  if (href) {
    const linkProps = external ? { target: "_blank" as const, rel: "noopener noreferrer" } : {};
    return <Link href={href} className={baseClasses} aria-label={ariaLabel} {...linkProps}>{children}</Link>;
  }

  return <button type={type} onClick={onClick} disabled={disabled} className={baseClasses} aria-label={ariaLabel}>{children}</button>;
}
