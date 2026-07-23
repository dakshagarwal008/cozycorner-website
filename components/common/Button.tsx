import Link from "next/link";

type ButtonProps = {
  text: string;
  href: string;
  variant?: "primary" | "secondary";
};

export default function Button({
  text,
  href,
  variant = "primary",
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-full px-6 py-3 font-semibold transition-all duration-300";

  const styles =
    variant === "primary"
      ? "bg-[#D4AF37] text-white hover:bg-[#b8922f] hover:scale-105"
      : "border-2 border-[#6F4E37] text-[#6F4E37] hover:bg-[#6F4E37] hover:text-white";

  return (
    <Link href={href} className={`${base} ${styles}`}>
      {text}
    </Link>
  );
}