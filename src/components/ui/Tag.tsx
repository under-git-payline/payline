type TagProps = {
  children: React.ReactNode;
};

export default function Tag({ children }: TagProps) {
  return (
    <span className="flex items-center justify-center bg-black/6 px-2 py-1 rounded-sm text-xs text-primary w-fit">
      {children}
    </span>
  );
}