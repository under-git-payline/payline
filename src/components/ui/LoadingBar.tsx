interface LoadingBarProps {
  current: number;
  total: number;
  className?: string;
}

export default function LoadingBar({ current, total, className = '' }: LoadingBarProps) {
  const percentage = total > 0 ? Math.min((current / total) * 100, 100) : 0;

  return (
    <div className={`h-2 w-full overflow-hidden rounded-full bg-black/4 ${className}`}>
      <div
        className="h-full rounded-full bg-[#040405] transition-all duration-500 ease-out"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}
