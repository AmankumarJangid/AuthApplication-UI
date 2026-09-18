"use client";

import React, { useState, useRef, useEffect } from "react";
import { Terminal as TerminalIcon } from "lucide-react";

interface CommandHistory {
  command: string;
  output: React.ReactNode;
}

export default function TerminalComponent() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<CommandHistory[]>([
    {
      command: "",
      output: (
        <div className="text-muted-foreground mb-2">
          Welcome to GameGrind.Dev Terminal v1.0.0. <br />
          Type <span className="text-primary font-bold">help</span> to see available commands.
        </div>
      ),
    },
  ]);
  
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to the bottom whenever history updates
  // useEffect(() => {
  //   bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  // }, [history]);

  const handleCommand = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const cmd = input.trim().toLowerCase();
      let output: React.ReactNode = "";

      if (cmd === "") {
        output = "";
      } else if (cmd === "help") {
        output = (
          <div className="text-muted-foreground">
            Available commands:
            <ul className="list-none mt-1 ml-4 space-y-1">
              <li><span className="text-primary">about</span>  - Learn more about Aman</li>
              <li><span className="text-primary">skills</span> - View tech stack</li>
              <li><span className="text-primary">clear</span>  - Clear the terminal</li>
              <li><span className="text-primary">echo</span>   - Print text back (e.g., echo hello)</li>
            </ul>
          </div>
        );
      } else if (cmd === "about") {
        output = "Hey, I'm Aman Jangid. I build modern, high-performance web applications.";
      } else if (cmd === "skills") {
        output = "Java, Spring Boot, Kubernetes, Next.js, React, TypeScript, Tailwind CSS, Shadcn UI, 3D Animations.";
      } else if (cmd === "clear") {
        setHistory([]);
        setInput("");
        return;
      } else if (cmd.startsWith("echo ")) {
        output = cmd.replace("echo ", "");
      } else {
        output = <span className="text-red-400">Command not found: {cmd}. Type 'help' for a list of commands.</span>;
      }

      setHistory((prev) => [...prev, { command: input, output }]);
      setInput("");
    }
  };

  return (
    <div className="w-full max-w-4xl m-10 mx-auto rounded-xl overflow-hidden border border-border/50 shadow-2xl bg-black/90 font-mono text-sm">
      {/* Terminal Header (macOS style) */}
      <div className="flex items-center px-4 py-3 bg-zinc-900 border-b border-border/50">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
        </div>
        <div className="flex-1 flex justify-center items-center gap-2 text-xs text-muted-foreground">
          <TerminalIcon className="w-3 h-3" />
          aman@gamegrind:~
        </div>
      </div> 

      {/* Terminal Body */}
      <div className="p-4 h-[350px] overflow-y-auto flex flex-col gap-2 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent bg-accent">
        {history.map((entry, index) => (
          <div key={index}>
            {entry.command && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <span className="text-green-500">aman@gamegrind:~$</span>
                <span>{entry.command}</span>
              </div>
            )}
            <div className="mt-1 text-foreground">{entry.output}</div>
          </div>
        ))}
        
        {/* Active Input Line */}
        <div className="flex items-center gap-2 text-foreground mt-2">
          <span className="text-green-500">aman@gamegrind:~$</span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleCommand}
            autoFocus
            spellCheck="false"
            className="flex-1 bg-transparent outline-none border-none text-foreground caret-primary"
          />
        </div>
        
        {/* Invisible div to target for auto-scrolling */}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}