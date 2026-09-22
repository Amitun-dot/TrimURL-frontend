'use client';

import { motion } from 'framer-motion';
import { ArrowDown, Scissors } from 'lucide-react';

export default function Preview() {
  return (
    <section className="relative py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="glass rounded-3xl p-8 sm:p-10"
        >
          <div className="flex flex-col items-center gap-5 text-center">
            {/* Long URL */}
            <div className="w-full">
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Long URL
              </span>
              <div className="mt-2 rounded-xl border border-border bg-secondary/30 px-4 py-3.5">
                <p className="text-sm text-muted-foreground truncate font-mono">
                  https://example.com/articles/technology/how-to-build-amazing-products
                </p>
              </div>
            </div>

            {/* Arrow + TrimURL badge */}
            <div className="flex flex-col items-center gap-2">
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              >
                <ArrowDown className="h-6 w-6 text-primary/60" />
              </motion.div>
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5">
                <Scissors className="h-4 w-4 text-primary" />
                <span className="text-sm font-semibold gradient-text">TrimURL</span>
              </div>
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
              >
                <ArrowDown className="h-6 w-6 text-primary/60" />
              </motion.div>
            </div>

            {/* Short URL */}
            <div className="w-full">
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Short URL
              </span>
              <div className="mt-2 rounded-xl border border-primary/30 bg-primary/5 px-4 py-3.5">
                <p className="text-sm sm:text-base text-primary font-mono font-medium truncate">
                  trimurl.com/aB72xK
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
