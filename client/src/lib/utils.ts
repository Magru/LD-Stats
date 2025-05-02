import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
};

export const getInitials = (name: string): string => {
  if (!name) return '';
  
  const nameParts = name.split(' ');
  if (nameParts.length === 1) return nameParts[0].charAt(0).toUpperCase();
  
  return (nameParts[0].charAt(0) + nameParts[1].charAt(0)).toUpperCase();
};

export const getColorByIndex = (index: number): string => {
  const colors = [
    'bg-primary text-primary-foreground',
    'bg-accent text-accent-foreground',
    'bg-warning text-warning-foreground',
    'bg-success text-success-foreground',
    'bg-secondary text-secondary-foreground',
  ];
  
  return colors[index % colors.length];
};

export const getIconColorByIndex = (index: number): string => {
  const colors = [
    'bg-primary/10 text-primary',
    'bg-accent/10 text-accent',
    'bg-warning/10 text-warning',
    'bg-success/10 text-success',
    'bg-secondary/10 text-secondary',
  ];
  
  return colors[index % colors.length];
};

export const formatDate = (dateString: string): string => {
  // Handle relative dates like "2 hours ago", "Yesterday", etc.
  if (dateString.includes('ago') || 
      dateString.includes('Yesterday') || 
      dateString.includes('days ago')) {
    return dateString;
  }
  
  // Handle ISO date strings
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  } catch (e) {
    return dateString;
  }
};

export const calculatePercentageChange = (current: number, previous: number): number => {
  if (previous === 0) return 0;
  return Math.round(((current - previous) / previous) * 100);
};

export const debounce = <F extends (...args: any[]) => any>(
  func: F,
  waitFor: number
) => {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<F>): Promise<ReturnType<F>> => {
    if (timeout) {
      clearTimeout(timeout);
    }

    return new Promise(resolve => {
      timeout = setTimeout(() => {
        resolve(func(...args));
      }, waitFor);
    });
  };
};
