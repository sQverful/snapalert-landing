'use client';

import {useState} from 'react';

const EMAIL = 'snapalertdemo@gmail.com';

export default function ContactEmail({label}: {label: string}) {
  const [revealed, setRevealed] = useState(false);
  const [copied, setCopied] = useState(false);

  function handleClick() {
    if (!revealed) {
      setRevealed(true);
      return;
    }
    navigator.clipboard.writeText(EMAIL).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  if (!revealed) {
    return (
      <button
        onClick={handleClick}
        className="text-sm text-muted transition-colors hover:text-foreground"
      >
        {label}
      </button>
    );
  }

  return (
    <button
      onClick={handleClick}
      className="text-sm text-primary transition-colors hover:underline"
      title="Click to copy"
    >
      {copied ? 'Copied!' : EMAIL}
    </button>
  );
}
