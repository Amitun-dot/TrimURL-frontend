'use client';

import { motion } from 'framer-motion';
import { Link2 } from 'lucide-react';

export default function ProcessingState() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="glass rounded-2xl p-8 flex flex-col items-center justify-center gap-5"
    >
      <div className="relative flex h-16 w-16 items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0 rounded-full border-2 border-transparent border-t-primary border-r-primary/40"
        />
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Link2 className="h-7 w-7 text-primary" />
        </motion.div>
      </div>
      <p className="text-sm font-medium text-muted-foreground">
        Creating your short link
        <motion.span
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          ...
        </motion.span>
      </p>
    </motion.div>
  );
}
