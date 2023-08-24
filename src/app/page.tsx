"use client";

import { Moon, Palmtree, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Textarea } from "@/components/ui/textarea";

function Home() {
  const { setTheme } = useTheme();

  return (
    <>
      <div className="flex justify-between p-6 border">
        <h1 className="text-4xl font-bold flex">
          <Palmtree className="h-10 w-10" />
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
          <div className="relative">
            <Textarea
              placeholder="Enter or paste your text or press 'Summarize'"
              rows={25}
              cols={60}
            />
          </div>
          <div className="w-[590px] p-5">
            <p></p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
