import { Skeleton } from "./ui/skeleton";

export const ParagraphSkeleton = () => {
  return (
    <div className="w-[590px] max-[925px]:w-full p-8">
      <h2 className="text-3xl font-semibold">Summarizing...</h2>
      <br />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[240px]" />
        <Skeleton className="h-4 w-[230px]" />
        <Skeleton className="h-4 w-[220px]" />
        <Skeleton className="h-4 w-[210px]" />
        <Skeleton className="h-4 w-[200px]" />
        <Skeleton className="h-4 w-[190px]" />
        <Skeleton className="h-4 w-[180px]" />
      </div>
    </div>
  );
};
