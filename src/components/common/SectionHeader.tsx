import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  description?: string;
  children?: ReactNode;
  centered?: boolean;
}

export function SectionHeader({ 
  title, 
  subtitle, 
  description, 
  children, 
  centered = false 
}: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className={`mb-16 ${centered ? 'text-center' : ''}`}
    >
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-primary font-medium mb-4 uppercase tracking-wide text-sm"
        >
          {subtitle}
        </motion.p>
      )}
      
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
        className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6"
      >
        {title}
      </motion.h2>
      
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className={`text-lg text-muted-foreground leading-relaxed ${
            centered ? 'mx-auto max-w-2xl' : 'max-w-3xl'
          }`}
        >
          {description}
        </motion.p>
      )}
      
      {children && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-8"
        >
          {children}
        </motion.div>
      )}
    </motion.div>
  );
}