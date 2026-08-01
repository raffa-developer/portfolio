import { useEffect, useMemo, useRef, useState, type FormEvent } from 'react';

type TerminalLine = {
  type: 'system' | 'command' | 'output';
  content: string;
};

const initialLines: TerminalLine[] = [
  { type: 'system', content: 'Welcome to Rafael Gonçalves workspace.' },
  { type: 'system', content: 'Type "help" to discover the experience.' },
];

interface InteractiveTerminalProps {
  onGameWin?: () => void;
}

export const InteractiveTerminal = ({ onGameWin }: InteractiveTerminalProps) => {
  const [lines, setLines] = useState<TerminalLine[]>(initialLines);
  const [input, setInput] = useState('');
  const [isReady, setIsReady] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setIsReady(true);
      inputRef.current?.focus();
    }, 400);
    return () => window.clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const command = input.trim();
    if (!command) return;

    const normalized = command.toLowerCase();

    if (normalized === 'clear') {
      setLines([{ type: 'system', content: 'Terminal cleared.' }]);
      setInput('');
      return;
    }

    const response = getResponse(normalized);
    setLines((prev) => [
      ...prev,
      { type: 'command', content: `visitor@portfolio:~$ ${command}` },
      { type: 'output', content: response },
    ]);
    setInput('');
  };

  const hint = useMemo(() => {
    return isReady ? 'Try: help, whoami, skills, projects, contact' : 'Starting terminal...';
  }, [isReady]);

  return (
    <div
      className="relative mx-auto mt-8 w-full max-w-2xl overflow-hidden rounded-xl border border-border/60 bg-[#0f172a] shadow-[0_0_0_1px_rgba(255,255,255,0.03)] transition-transform duration-300 hover:-translate-y-1"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="flex items-center gap-2 border-b border-white/10 bg-[#111827] px-3 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-2 text-[11px] uppercase tracking-[0.2em] text-slate-400">bash</span>
      </div>

      <div
        ref={scrollRef}
        className="h-56 overflow-y-auto bg-[#020617] p-3 font-mono text-sm text-slate-100"
      >
        {lines.map((line, index) => (
          <div key={`${line.type}-${index}`} className="mb-1 whitespace-pre-wrap text-left">
            {line.type === 'command' && <span className="text-[#7dd3fc]">{line.content}</span>}
            {line.type === 'output' && <span className="text-[#86efac]">{line.content}</span>}
            {line.type === 'system' && <span className="text-slate-500">{line.content}</span>}
          </div>
        ))}

        <form onSubmit={handleSubmit} className="mt-2 flex items-center gap-2 text-left">
          <span className="text-[#7dd3fc]">visitor@portfolio:~$</span>
          <input
            ref={inputRef}
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder=""
            className="flex-1 bg-transparent text-sm text-slate-100 outline-none placeholder:text-slate-500"
            aria-label="Terminal command"
          />
        </form>
      </div>

      <p className="px-3 pb-2 pt-1 text-[11px] text-slate-500">{hint}</p>
    </div>
  );
};

const getResponse = (command: string) => {
  switch (command) {
    case 'help':
      return 'Commands: help, whoami, clear, quit';
    case 'whoami':
      return 'Rafael Gonçalves — Fullstack Developer with experience in building scalable web applications.';
    case 'skills':
      return '.NET • C# • React • Performance optimization';
    case 'projects':
      return 'The portfolio has a dedicated Projects section.';
    case 'contact':
      return 'The contact section is waiting for your message.';
    case 'surprise':
      return '✨ You found a small hidden detail. Thanks for exploring the site!';
    default:
      return 'Command not found. Try "help".';
  }
};
