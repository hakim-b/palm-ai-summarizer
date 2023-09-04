import { If } from "react-haiku";
import { Button } from "./ui/button";
import { Copy } from "lucide-react";
import { wordCount } from "@/utilities/wordCount";

type SummaryProps = {
  content: string;
};

export const Summary = async ({ content }: SummaryProps) => {
  return (
    <>
      <p className="p-8">{content}</p>
      <If isTrue={content !== undefined && content.length > 0}>
        <div className="flex justify-between">
          <span className="p-3">{wordCount(content)} Words</span>
          <Button
            variant="ghost"
            onClick={() => navigator.clipboard.writeText(content)}
          >
            <Copy color="#1c9b4d" className="h-6 w-6" />
            Copy
          </Button>
        </div>
      </If>
    </>
  );
};
