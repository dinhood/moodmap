import { useEffect, useState } from "react";

export default function TerminalLoader({ text = "Processando arquivos comportamentais" }) {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + "." : ""));
    }, 400);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="terminal-loader">
      <span className="terminal-text">
        {text}{dots}
      </span>
      <span className="terminal-cursor">▋</span>
    </div>
  );
}
