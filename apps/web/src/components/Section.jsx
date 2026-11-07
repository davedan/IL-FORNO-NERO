import React from 'react';
import { motion } from 'framer-motion';

export function Reveal({ children, delay = 0, className = '' }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function Kicker({ children }) {
  return (
    <span className="inline-flex items-center gap-3 text-[0.7rem] uppercase tracking-[0.28em] text-[hsl(var(--secondary))]">
      <span className="h-px w-8 bg-[hsl(var(--secondary))]/60" />
      {children}
    </span>
  );
}

export function Heading({ children, className = '' }) {
  return (
    <h2 className={`mt-4 font-display text-4xl leading-[1.05] sm:text-5xl md:text-[3.4rem] ${className}`}>{children}</h2>
  );
}
