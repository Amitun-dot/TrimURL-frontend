'use client';

import { motion } from 'framer-motion';
import { ClipboardPaste, Scissors, Share2 } from 'lucide-react';

const steps = [
  {
    number: '01',
    title: 'Paste',
    description: 'Paste your long URL into the TrimURL input.',
    icon: ClipboardPaste,
  },
  {
    number: '02',
    title: 'Shorten',
    description: 'TrimURL creates a unique short link.',
    icon: Scissors,
  },
  {
    number: '03',
    title: 'Share',
    description: 'Copy your short URL and share it anywhere.',
    icon: Share2,
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            How it works
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Three steps. That&apos;s it.
          </p>
        </motion.div>

        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4">
          {/* Connecting line on desktop */}
          <div className="hidden md:block absolute top-12 left-[16.66%] right-[16.66%] h-px bg-gradient-to-r from-transparent via-border to-transparent" />

          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative flex flex-col items-center text-center"
              >
                <div className="relative flex h-24 w-24 items-center justify-center rounded-full glass-strong mb-6 z-10">
                  <Icon className="h-8 w-8 text-primary" />
                  <span className="absolute -top-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                    {step.number}
                  </span>
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground max-w-xs">
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
