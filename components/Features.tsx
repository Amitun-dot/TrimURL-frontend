'use client';

import { motion } from 'framer-motion';
import { Scissors, ShieldCheck, Smartphone } from 'lucide-react';

const features = [
  {
    title: 'Shortened',
    description:
      'Use any link, no matter how long. TrimURL turns complicated URLs into clean, easy-to-share links.',
    icon: Scissors,
  },
  {
    title: 'Secure',
    description:
      'Fast and secure URL shortening with validated links, protected API endpoints, and HTTPS-ready deployment.',
    icon: ShieldCheck,
  },
  {
    title: 'Devices',
    description:
      'TrimURL works smoothly across smartphones, tablets, laptops, and desktop browsers.',
    icon: Smartphone,
  },
];

import type { Variants } from 'framer-motion';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' as const },
  },
};

export default function Features() {
  return (
    <section
      id="features"
      className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Everything you need to shorten links.
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Built for speed and simplicity, designed for every device.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                variants={cardVariants}
                whileHover={{ y: -6 }}
                className="group glass rounded-2xl p-8 hover:border-primary/40 transition-colors"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-accent/10 border border-primary/20 mb-6 transition-transform group-hover:scale-110">
                  <Icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
