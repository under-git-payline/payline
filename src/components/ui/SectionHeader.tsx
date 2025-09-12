import Tag from "./Tag";

type SectionHeaderProps = {
  children?: React.ReactNode;
  tag?: string;
  title?: string;
  subtitle?: string;
};

export default function SectionHeader({ children, tag, title, subtitle }: SectionHeaderProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 max-w-[894px] mx-auto text-center">
        { tag && <Tag>{tag}</Tag> }
        { title && <h2 className="section-header-text">{title}</h2> }
        { subtitle && <p className="text-lg text-center">{subtitle}</p> }
        {children}
    </div>
  );
}