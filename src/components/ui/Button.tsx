type ButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "transparent" | "black" | "gray" | "grayLighter";
  onClick?: () => void;
};

export default function Button({ children, variant = "primary", onClick }: ButtonProps) {
  const styles = "w-full md:w-auto px-10 py-3 rounded-md font-medium transition-all flex gap-2 items-center justify-center text-sm cursor-pointer";
  const variants = {
    primary: "bg-blue-500 text-white hover:bg-blue-600",
    secondary: "bg-white text-[#018DD7] hover:bg-white",
    transparent: "bg-white/20 text-white hover:bg-white/30",
    black: "bg-black text-white hover:bg-gray-800",
    gray: "bg-black/8 text-[#010B24] hover:bg-black/12",
    grayLighter: "bg-white/20 text-white hover:bg-white/25"
  };

  return (
    <button onClick={onClick} className={`${styles} ${variants[variant]}`}>
      {children}
    </button>
  );
}