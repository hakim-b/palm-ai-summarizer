import { Copy } from "lucide-react";
import { useClipboard, If } from "react-haiku";
import { Button } from "./ui/button";
import { wordCount } from "@/lib/utils";

type SummaryProps = {
  content: string;
};

export const Summary = ({ content }: SummaryProps) => {
  const clipboard = useClipboard({ timeout: 3000 });

  return (
    <>
      <p className="p-8">{content}</p>
      <If isTrue={content !== undefined && content.length > 0}>
        <div className="flex justify-between">
          <span className="p-3">{wordCount(content)} Words</span>
          <Button variant="ghost" onClick={() => clipboard.copy(content)}>
            <Copy color="#1c9b4d" className="h-6 w-6" />
            {clipboard.copied ? "Copied" : "Copy"}
          </Button>
        </div>
      </If>
    </>
  );
};
