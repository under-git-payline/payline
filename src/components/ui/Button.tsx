type ButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "transparent" | "black" | "gray" | "grayLighter" | "rounded" | "darkTransparent";
  onClick?: () => void;
  disabled?: boolean;
};

export default function Button({ children, variant = "primary", onClick, disabled = false }: ButtonProps) {
  const styles = "w-full md:w-auto font-medium transition-all flex gap-2 items-center justify-center text-sm cursor-pointer";
  const variants = {
    primary: "px-10 py-3 rounded-md bg-blue-500 text-white hover:bg-blue-600",
    secondary: "px-10 py-3 rounded-md bg-white text-[#018DD7] hover:bg-white",
    transparent: "px-10 py-3 rounded-md bg-white/20 text-white hover:bg-white/30",
    darkTransparent: "px-10 py-3 rounded-md bg-black/8 text-black hover:bg-black/10",
    black: "px-10 py-3 rounded-md bg-black text-white hover:bg-gray-800",
    gray: "px-10 py-3 rounded-md bg-black/8 text-[#010B24] hover:bg-black/12",
    grayLighter: "px-10 py-3 rounded-md bg-white/20 text-white hover:bg-white/25",
    rounded: "p-3 rounded-full bg-black/8 text-[#010B24] hover:bg-black/12",
  };

  return (
    <button 
      onClick={onClick} 
      disabled={disabled}
      className={`${styles} ${variants[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {children}
    </button>
  );
}