"use client";

import { Moon, Palmtree, Sun, UploadCloud } from "lucide-react";
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

const formSchema = z.object({
  text: z.string().min(1, { message: "Please enter some text to summarize" }),
});

type FormValues = z.infer<typeof formSchema>;

function Home() {
  const { setTheme } = useTheme();

  const form = useForm<FormValues>({ resolver: zodResolver(formSchema) });

  const onSubmit = (data: FormValues) => {
    console.log(data.text);
  };

  return (
    <>
      <div className="flex justify-between p-6 border">
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
        <div className="mt-12 rounded-lg flex border w-fit">
          <Form {...form}>
            <form className="relative" onSubmit={form.handleSubmit(onSubmit)}>
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
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-between">
                <Button variant="ghost" type="button">
                  <Label htmlFor="wordDoc">
                    <span className="flex">
                      <UploadCloud color="#1c9b4d" className="h-6 w-6" /> Upload
                      Doc
                    </span>
                  </Label>
                  <Input id="wordDoc" type="file" className="hidden" />
                </Button>
                <Button type="submit">Submit</Button>
              </div>
            </form>
          </Form>

          <div className="w-[590px] p-5">
            <p></p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
