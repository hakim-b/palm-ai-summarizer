"use client";

import {
  Moon,
  Palmtree,
  Sun,
  Clipboard,
  UploadCloud,
  Github,
} from "lucide-react";
import { useTheme } from "next-themes";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { TypeAnimation } from "react-type-animation";
import { ChangeEvent, useState } from "react";
import { If, Show } from "react-haiku";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import mammoth from "mammoth";
import Link from "next/link";
import { getDoc, addDoc, collection } from "firebase/firestore";
import { db } from "@/firebase.config";

const formSchema = z.object({
  text: z.string().min(1, { message: "Please enter some text to summarize" }),
});

type FormValues = z.infer<typeof formSchema>;

function wordCount(strIn: string) {
  const trimStr = strIn.trim();
  if (trimStr === "") {
    return 0; // Return 0 if the string is empty
  }

  const wordArr = trimStr.split(/\s+/);
  return wordArr.length;
}

function Home() {
  const { setTheme } = useTheme();

  const form = useForm<FormValues>({ resolver: zodResolver(formSchema) });

  const [newText, setNewText] = useState("");
  const [summary, setSummary] = useState("");

  const onSubmit = async (data: FormValues) => {
    const newDocRef = await addDoc(collection(db, "text_documents"), {
      text: data.text,
    });

    const docSnap = await getDoc(newDocRef);
    const docData = docSnap.data();

    setNewText(data.text);
    setSummary(docData?.summary);

    console.log("Document:", newText, summary);
  };

  const handleTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setNewText(value);
    form.setValue("text", value); // Update form value
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

  return (
    <>
      <div className="flex justify-between p-6 border shadow-sm">
        <h1 className="text-4xl font-bold flex">
          <Palmtree className="h-10 w-10" color="#1c9b4d" />
          Summarizer
        </h1>
        <div className="flex gap-2">
          <Link
            href="https://github.com/hakim-b/palm-ai-summarizer"
            className={buttonVariants({ variant: "ghost", size: "icon" })}
            target="_blank"
          >
            <Github className="h-7 w-7" />
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

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
                        />
                      </FormControl>
                      <FormMessage className="p-2" />
                    </FormItem>
                  )}
                />
                <If isTrue={!form.watch("text")}>
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
                  <Show.When isTrue={!form.watch("text")}>
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
          <div className="w-[590px] p-5">
            <TypeAnimation
              sequence={[summary, 2000]}
              wrapper="p"
              cursor={true}
              className="p-2"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
