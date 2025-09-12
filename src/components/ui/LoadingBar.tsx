interface LoadingBarProps {
  current: number;
  total: number;
  className?: string;
}

export default function LoadingBar({ current, total, className = '' }: LoadingBarProps) {
  const percentage = Math.min((current / total) * 100, 100);
  
  return (
    <div className={`w-full max-w-md mx-auto ${className}`}>
      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
        <div 
          className="bg-[#016EA8] h-2 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
