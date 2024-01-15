"use client";

import { Github, Moon, Palmtree, Sun } from "lucide-react";
import Link from "next/link";
import { Button, buttonVariants } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "./ui/dropdown-menu";
import { useTheme } from "next-themes";

function Navbar() {
  const { setTheme } = useTheme();

  return (
    <>
      <header className="shadow-md border p-3 sm:p-5 w-full">
        <div className="container flex items-center justify-between">
          <div className="flex items-center">
            <Palmtree className="h-8 w-8" color="#16a34a" />
            <h1 className="text-sm min-[925px]:text-3xl font-bold ml-2">
              PaLM AI Summarizer
            </h1>
          </div>
          <div className="flex items-center space-x-4">
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
      </header>
    </>
  );
}

export default Navbar;
