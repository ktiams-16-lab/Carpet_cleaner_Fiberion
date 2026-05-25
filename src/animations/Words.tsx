'use client';

import { ReactNode, useRef } from 'react';
import { motion, MotionValue, useInView, useTransform } from 'framer-motion';

type Segment = { text: string; className?: string };

const ease = [0.16, 1, 0.3, 1] as const;

export function WordsPullUp({ text, className = '' }: { text: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const words = text.split(' ');

  return (
    <span ref={ref} className={`inline-flex flex-wrap ${className}`}>
      {words.map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
          className="inline-block"
          initial={{ y: 20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
          transition={{ delay: index * 0.08, duration: 0.9, ease }}
        >
          {word}
          {index < words.length - 1 ? '\u00A0' : null}
        </motion.span>
      ))}
    </span>
  );
}

export function WordsPullUpMultiStyle({
  segments,
  className = '',
  align = 'center'
}: {
  segments: Segment[];
  className?: string;
  align?: 'left' | 'center';
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const words = segments.flatMap((segment) =>
    segment.text.split(' ').map((word) => ({ word, className: segment.className ?? '' }))
  );

  return (
    <div
      ref={ref}
      className={`inline-flex flex-wrap ${align === 'center' ? 'justify-center' : 'justify-start'} ${className}`}
    >
      {words.map(({ word, className: wordClassName }, index) => (
        <motion.span
          key={`${word}-${index}`}
          className={`mr-[0.22em] inline-block ${wordClassName}`}
          initial={{ y: 20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
          transition={{ delay: index * 0.08, duration: 0.85, ease }}
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
}

export function AnimatedLetter({
  character,
  index,
  totalChars,
  scrollYProgress
}: {
  character: string;
  index: number;
  totalChars: number;
  scrollYProgress: MotionValue<number>;
}) {
  const charProgress = totalChars <= 1 ? 1 : index / totalChars;
  const opacity = useTransform(
    scrollYProgress,
    [Math.max(0, charProgress - 0.1), Math.min(1, charProgress + 0.05)],
    [0.2, 1]
  );

  return <motion.span style={{ opacity }}>{character === ' ' ? '\u00A0' : character}</motion.span>;
}

export function MotionFade({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ delay, duration: 0.8, ease }}
    >
      {children}
    </motion.div>
  );
}
