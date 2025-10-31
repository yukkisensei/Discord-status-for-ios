import { motion } from 'framer-motion';

export default function GlassCard({ children, hover = false, className = '' }) {
  const Component = hover ? motion.div : 'div';
  
  const hoverProps = hover ? {
    whileHover: { scale: 1.02, y: -5 },
    transition: { duration: 0.3 }
  } : {};

  return (
    <Component
      className={`glass ${hover ? 'glass-hover' : ''} ${className}`}
      {...hoverProps}
    >
      {children}
    </Component>
  );
}
