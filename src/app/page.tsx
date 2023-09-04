"use client";

import { Clipboard, UploadCloud, Copy, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { ChangeEvent, useState } from "react";
import { If, Show, useBoolToggle, useClipboard } from "react-haiku";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import mammoth from "mammoth";
import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { db } from "@/firebase.config";
import { Skeleton } from "@/components/ui/skeleton";
import Navbar from "@/components/navbar";

const formSchema = z.object({
  text: z.string().min(1, { message: "Please enter some text to summarize" }),
});

type FormValues = z.infer<typeof formSchema>;

function Home() {
  const form = useForm<FormValues>({ resolver: zodResolver(formSchema) });

  const [newText, setNewText] = useState("");
  const [summary, setSummary] = useState("");

  const [isLoading, toggleLoading] = useBoolToggle(false);

  const clipboard = useClipboard();

  const loadingClass = isLoading
    ? "w-[590px] p-8"
    : "w-[590px] flex flex-col justify-between";

  const onSubmit = async (data: FormValues) => {
    toggleLoading();

    const newDocRef = await addDoc(collection(db, "text_documents"), {
      text: data.text,
    });

    setNewText(data.text);

    onSnapshot(newDocRef, (doc) => {
      const newSummary = doc.data()?.summary as string;
      setSummary(newSummary);
      toggleLoading();
    });
  };

  const handleTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setNewText(value);
    form.setValue("text", value);
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const result = await mammoth.extractRawText({
        arrayBuffer: await file.arrayBuffer(),
      });
      setNewText(result.value);
      form.setValue("text", result.value);
    }
  };

  const wordCount = (strIn: string) => {
    const trimStr = strIn?.trim();
    if (trimStr === "") {
      return 0;
    }

    const wordArr = trimStr?.split(/\s+/);
    return wordArr?.length;
  };

  return (
    <>
      <Navbar />

      <div className="flex justify-center">
        <div className="mt-12 rounded-lg flex border w-fit shadow-2xl">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="relative">
                <FormField
                  control={form.control}
                  name="text"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder="Enter or paste your text or press 'Summarize'"
                          rows={25}
                          cols={60}
                          {...field}
                          className="border-none outline-none resize-none p-8"
                          value={newText}
                          onChange={handleTextareaChange}
                          style={{ fontSize: "16px" }}
                        />
                      </FormControl>
                      <FormMessage className="p-2" />
                    </FormItem>
                  )}
                />
                <If isTrue={!form.watch("text") || newText.length === 0}>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <Button
                      variant={"outline"}
                      type="button"
                      className="py-8 px-3"
                      onClick={() => {
                        navigator.clipboard.readText().then((pastedText) => {
                          setNewText(pastedText);
                          form.setValue("text", pastedText);
                        });
                      }}
                    >
                      <Clipboard color="#1c9b4d" className="h-10 w-10" />
                      Paste Text
                    </Button>
                  </div>
                </If>
              </div>

              <div className="flex justify-between mt-5">
                <Show>
                  <Show.When
                    isTrue={!form.watch("text") || newText.length === 0}
                  >
                    <Button
                      variant="ghost"
                      type="button"
                      className="flex items-center justify-center"
                    >
                      <Label htmlFor="wordDoc">
                        <span className="flex items-center">
                          <UploadCloud color="#1c9b4d" className="h-6 w-6" />{" "}
                          &nbsp; Upload Doc
                        </span>
                      </Label>
                      <Input
                        id="wordDoc"
                        type="file"
                        className="hidden"
                        accept=".txt, text/plain, .doc, .docx, application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                        onChange={handleFileChange}
                      />
                    </Button>{" "}
                  </Show.When>
                  <Show.Else>
                    <span className="p-3">{wordCount(newText)} Words</span>
                  </Show.Else>
                </Show>

                <Button type="submit">Summarize</Button>
              </div>
            </form>
          </Form>
          <Separator orientation="vertical" />
          <div className={loadingClass}>
            <Show>
              <Show.When isTrue={isLoading}>
                <h2 className="text-3xl font-semibold">Summarizing...</h2>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[240px]" />
                  <Skeleton className="h-4 w-[230px]" />
                  <Skeleton className="h-4 w-[220px]" />
                  <Skeleton className="h-4 w-[210px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </Show.When>
              <Show.Else>
                <p className="p-8">{summary}</p>

                <If isTrue={summary !== undefined && summary.length > 0}>
                  <div className="flex justify-between">
                    <span className="p-3">{wordCount(summary)} Words</span>
                    <Button
                      variant="ghost"
                      onClick={() => clipboard.copy(summary)}
                    >
                      <Copy color="#1c9b4d" className="h-6 w-6" />
                      Copy
                    </Button>
                  </div>
                </If>
              </Show.Else>
            </Show>
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center mt-16">
        <Button
          variant="destructive"
          onClick={() => {
            setNewText("");
            setSummary("");
          }}
        >
          <Trash />
          Clear all text
        </Button>
      </div>
    </>
  );
}

export default Home;
