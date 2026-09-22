'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Copy, ExternalLink, RotateCcw, Sparkles } from 'lucide-react';
import type { UrlResponse } from '@/types/url';

interface ResultCardProps {
  result: UrlResponse;
  onShortenAnother: () => void;
}

export default function ResultCard({ result, onShortenAnother }: ResultCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(result.shortUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for browsers without clipboard API
      const textarea = document.createElement('textarea');
      textarea.value = result.shortUrl;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand('copy');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch {
        // silently fail
      }
      document.body.removeChild(textarea);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="glass rounded-2xl p-5 sm:p-6"
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-success/15">
          <Check className="h-5 w-5 text-success" />
        </div>
        <span className="text-sm font-semibold text-foreground">
          Your shortened URL
        </span>
        <Sparkles className="h-4 w-4 text-primary/60 ml-auto" />
      </div>

      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
        <div className="flex-1 min-w-0 rounded-xl border border-border bg-secondary/40 px-4 py-3.5">
          <a
            href={result.shortUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block truncate text-sm sm:text-base font-medium text-primary hover:text-accent transition-colors"
            title={result.shortUrl}
          >
            {result.shortUrl}
          </a>
        </div>
        <div className="flex gap-2.5">
          <button
            onClick={handleCopy}
            aria-label={copied ? 'Copied to clipboard' : 'Copy shortened URL'}
            className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3.5 text-sm font-semibold transition-all active:scale-95 ${
              copied
                ? 'bg-success text-success-foreground'
                : 'bg-primary text-primary-foreground glow-primary hover:glow-primary-strong hover:scale-[1.03]'
            }`}
          >
            {copied ? (
              <>
                <Check className="h-4 w-4" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                Copy
              </>
            )}
          </button>
          <a
            href={result.shortUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open shortened URL in new tab"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-secondary/60 px-4 py-3.5 text-sm font-semibold text-foreground hover:bg-secondary hover:border-primary/40 transition-all active:scale-95"
          >
            <ExternalLink className="h-4 w-4" />
            <span className="hidden sm:inline">Open</span>
          </a>
        </div>
      </div>

      <button
        onClick={onShortenAnother}
        className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
      >
        <RotateCcw className="h-3.5 w-3.5" />
        Shorten another
      </button>
    </motion.div>
  );
}
