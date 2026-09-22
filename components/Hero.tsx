'use client';

import { motion } from 'framer-motion';
import UrlShortener from './UrlShortener';

export default function Hero() {
  return (
    <section
      id="home"
      className="relative pt-32 pb-20 sm:pt-36 sm:pb-24 px-4 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/40 px-4 py-1.5 mb-8"
        >
          <span className="flex h-2 w-2 rounded-full bg-success animate-pulse-glow" />
          <span className="text-xs font-medium text-muted-foreground">
            Fast, free, no sign-up required
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05, ease: 'easeOut' }}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]"
        >
          Shorten links.{' '}
          <span className="gradient-text">Share faster.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
          className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
        >
          Turn long, complicated URLs into clean, shareable links in seconds.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25, ease: 'easeOut' }}
          className="mt-10"
        >
          <UrlShortener />
        </motion.div>
      </div>
    </section>
  );
}
