'use client';

import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ClipboardPaste, Link2, AlertCircle, Loader2 } from 'lucide-react';
import { createShortUrl } from '@/lib/api';
import type { UrlResponse, ApiError } from '@/types/url';
import ProcessingState from './ProcessingState';
import ResultCard from './ResultCard';

const MAX_URL_LENGTH = 2048;

type Status = 'idle' | 'processing' | 'success' | 'error';

function isValidUrl(url: string): boolean {
  if (!url || url.trim().length === 0) return false;
  if (url.length > MAX_URL_LENGTH) return false;
  try {
    const parsed = new URL(url.trim());
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

export default function UrlShortener() {
  const [url, setUrl] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string>('');
  const [result, setResult] = useState<UrlResponse | null>(null);
  const [pasteFeedback, setPasteFeedback] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setUrl(text.trim());
        setPasteFeedback(true);
        setTimeout(() => setPasteFeedback(false), 1500);
      }
    } catch {
      // Clipboard not available — silently fail, user can type manually
    }
  };

  const handleSubmit = useCallback(
    async (e?: React.FormEvent) => {
      e?.preventDefault();

      const trimmed = url.trim();
      if (!trimmed) {
        setError('Please enter a valid URL.');
        setStatus('error');
        return;
      }
      if (!isValidUrl(trimmed)) {
        setError('Please enter a valid URL.');
        setStatus('error');
        return;
      }

      setStatus('processing');
      setError('');

      try {
        const response = await createShortUrl(trimmed);
        setResult(response);
        setStatus('success');
      } catch (err) {
        const apiError = err as ApiError;
        setError(apiError.message);
        setStatus('error');
      }
    },
    [url]
  );

  const handleShortenAnother = () => {
    setStatus('idle');
    setResult(null);
    setError('');
    setUrl('');
    inputRef.current?.focus();
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* URL Input Form */}
      {status !== 'success' && status !== 'processing' && (
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 1 }}
          className="w-full"
        >
          <label htmlFor="url-input" className="sr-only">
            Enter a long URL to shorten
          </label>
          <div className="glass rounded-2xl p-2 flex flex-col sm:flex-row gap-2 items-stretch">
            <div className="relative flex-1 flex items-center">
              <Link2 className="absolute left-4 h-5 w-5 text-muted-foreground pointer-events-none" />
              <input
                id="url-input"
                ref={inputRef}
                type="url"
                inputMode="url"
                autoComplete="url"
                value={url}
                onChange={(e) => {
                  setUrl(e.target.value);
                  if (status === 'error') setStatus('idle');
                }}
                placeholder="Paste your long URL here..."
                maxLength={MAX_URL_LENGTH}
                aria-invalid={status === 'error'}
                aria-describedby={status === 'error' ? 'url-error' : undefined}
                className="w-full bg-transparent pl-12 pr-3 py-3.5 text-sm sm:text-base text-foreground placeholder:text-muted-foreground/60 focus:outline-none rounded-xl"
              />
              <button
                type="button"
                onClick={handlePaste}
                aria-label="Paste URL from clipboard"
                className="absolute right-2 inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
              >
                {pasteFeedback ? (
                  <>
                    <Link2 className="h-3.5 w-3.5 text-success" />
                    Pasted
                  </>
                ) : (
                  <>
                    <ClipboardPaste className="h-3.5 w-3.5" />
                    Paste
                  </>
                )}
              </button>
            </div>
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground glow-primary hover:glow-primary-strong transition-all hover:scale-[1.02] active:scale-95"
            >
              Shorten URL
            </button>
          </div>
        </motion.form>
      )}

      {/* Processing State */}
      <AnimatePresence mode="wait">
        {status === 'processing' && (
          <ProcessingState key="processing" />
        )}

        {/* Success Result */}
        {status === 'success' && result && (
          <ResultCard
            key="result"
            result={result}
            onShortenAnother={handleShortenAnother}
          />
        )}
      </AnimatePresence>

      {/* Error State */}
      <AnimatePresence>
        {status === 'error' && error && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            id="url-error"
            role="alert"
            className="mt-3 flex items-center gap-2.5 rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3"
          >
            <AlertCircle className="h-4 w-4 text-destructive shrink-0" />
            <span className="text-sm text-destructive-foreground/90">{error}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Processing inline indicator (when form is hidden) */}
      {status === 'processing' && (
        <div className="mt-3 flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span>Creating your short link...</span>
        </div>
      )}
    </div>
  );
}
