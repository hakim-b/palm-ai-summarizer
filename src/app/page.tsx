"use client";

import { Moon, Palmtree, Sun, UploadCloud, Clipboard } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
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
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { TypeAnimation } from "react-type-animation";
import { ChangeEvent, useEffect, useState } from "react";
import { If } from "react-haiku";
import { useClipboardPaste } from "@/hooks/useClipboardPaste";

const formSchema = z.object({
  text: z.string().min(1, { message: "Please enter some text to summarize" }),
});

type FormValues = z.infer<typeof formSchema>;

function Home() {
  const { setTheme } = useTheme();

  const form = useForm<FormValues>({ resolver: zodResolver(formSchema) });

  const [newText, setNewText] = useState("");
  const pastedText = useClipboardPaste();

  const onSubmit = (data: FormValues) => {
    console.log(data.text);
  };

  const handleTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setNewText(value);
    form.setValue("text", value); // Update form value
  };

  useEffect(() => {
    if (pastedText) {
      setNewText(pastedText);
      form.setValue("text", pastedText); // Update form value
    }
  }, [pastedText, form]);

  return (
    <>
      <div className="flex justify-between p-6 border shadow-sm">
        <h1 className="text-4xl font-bold flex">
          <Palmtree className="h-10 w-10" color="#1c9b4d" />
          Summarizer
        </h1>
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
                        if (pastedText) {
                          setNewText(pastedText);
                          form.setValue("text", pastedText); // Update form value
                        }
                      }}
                    >
                      <Clipboard color="#1c9b4d" className="h-10 w-10" />
                      Paste Text
                    </Button>
                  </div>
                </If>
              </div>
              <div className="flex justify-between mt-5">
                <Button
                  variant="ghost"
                  type="button"
                  className="flex items-center justify-center"
                >
                  <Label htmlFor="wordDoc">
                    <span className="flex items-center">
                      <UploadCloud color="#1c9b4d" className="h-6 w-6" /> &nbsp;
                      Upload Doc
                    </span>
                  </Label>
                  <Input id="wordDoc" type="file" className="hidden" />
                </Button>
                <Button type="submit">Summarize</Button>
              </div>
            </form>
          </Form>
          <Separator orientation="vertical" />
          <div className="w-[590px] p-5">
            <TypeAnimation
              sequence={["Hello World", 2000]}
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
