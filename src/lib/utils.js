// Simple utility to concatenate class names (similar to clsx)
export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}
