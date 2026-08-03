type BlogTagProps = {
  name: string;
  count?: number;
  selected?: boolean;
  onClick?: () => void;
};

export default function BlogTag({ name, count, selected = false, onClick }: BlogTagProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`flex cursor-pointer items-center justify-center gap-2 rounded-full px-3 py-1.5 text-left transition-colors ${
        selected ? 'bg-[#018DD7] hover:bg-[#0180C4]' : 'bg-black/8 hover:bg-black/12'
      }`}
    >
      <span className={`text-[14px] leading-[24px] ${selected ? 'text-white' : 'text-[#040405]'}`}>
        {name}
      </span>
      {typeof count === 'number' && (
        <span className={`text-[12px] leading-[18px] ${selected ? 'text-white/60' : 'text-black/60'}`}>
          ({count})
        </span>
      )}
    </button>
  );
}
