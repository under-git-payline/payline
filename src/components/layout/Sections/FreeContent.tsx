import { FreeContentLayoutData, FlexibleContentProps } from "@/types/acf";

interface FreeContentProps extends FlexibleContentProps {
  data?: FreeContentLayoutData;
}

export default function FreeContent({ data }: FreeContentProps) {
  return (
    <div className="free-content-block container my-24">
      {data?.content && (
        <div className="max-w-[900px] mx-auto text-center" dangerouslySetInnerHTML={{ __html: data.content }} />
      )}
    </div>
  );
}