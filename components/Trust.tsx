'use client';

import { motion } from 'framer-motion';
import { Zap, MousePointerClick, Share2 } from 'lucide-react';

const points = [
  { icon: Zap, label: 'No accounts' },
  { icon: MousePointerClick, label: 'No complicated setup' },
  { icon: Share2, label: 'Just paste, shorten, and share' },
];

export default function Trust() {
  return (
    <section className="relative py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Simple by design.
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-xl mx-auto">
            No accounts. No complicated setup. Just paste, shorten, and share.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            {points.map((point) => {
              const Icon = point.icon;
              return (
                <div
                  key={point.label}
                  className="inline-flex items-center gap-2.5 rounded-full glass px-5 py-2.5"
                >
                  <Icon className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium text-foreground/90">
                    {point.label}
                  </span>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
