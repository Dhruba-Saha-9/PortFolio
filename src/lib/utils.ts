import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format a date string to a readable format
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

/**
 * Format a date range
 */
export function formatDateRange(startDate: string, endDate: string | null): string {
  const start = new Date(startDate);
  const startFormatted = start.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short'
  });
  
  if (!endDate) {
    return `${startFormatted} - Present`;
  }
  
  const end = new Date(endDate);
  const endFormatted = end.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short'
  });
  
  return `${startFormatted} - ${endFormatted}`;
}

/**
 * Create a URL-friendly slug from a string
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove non-alphanumeric characters except spaces and hyphens
    .replace(/[\s_-]+/g, '-') // Replace spaces, underscores, and multiple hyphens with single hyphen
    .replace(/^-+|-+$/g, ''); // Remove leading and trailing hyphens
}

/**
 * Filter items by tags
 */
export function filterByTags<T extends { tags: string[] }>(
  items: T[],
  selectedTags: string[]
): T[] {
  if (selectedTags.length === 0) {
    return items;
  }
  
  return items.filter(item =>
    selectedTags.some(tag => item.tags.includes(tag))
  );
}

/**
 * Get unique tags from an array of items
 */
export function getUniqueTags<T extends { tags: string[] }>(items: T[]): string[] {
  const allTags = items.flatMap(item => item.tags);
  return Array.from(new Set(allTags)).sort();
}

/**
 * Calculate reading time for text
 */
export function calculateReadingTime(text: string): number {
  const wordsPerMinute = 200;
  const words = text.split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

/**
 * Truncate text to a specified length
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) {
    return text;
  }
  return text.slice(0, maxLength).replace(/\s+\S*$/, '') + '...';
}

/**
 * Check if a date is in the past
 */
export function isPastDate(dateString: string): boolean {
  return new Date(dateString) < new Date();
}

/**
 * Get the duration between two dates in months
 */
export function getDurationInMonths(startDate: string, endDate: string | null): number {
  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : new Date();
  
  const yearDiff = end.getFullYear() - start.getFullYear();
  const monthDiff = end.getMonth() - start.getMonth();
  
  return yearDiff * 12 + monthDiff;
}

/**
 * Format duration in a human-readable way
 */
export function formatDuration(months: number): string {
  if (months < 12) {
    return `${months} month${months !== 1 ? 's' : ''}`;
  }
  
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;
  
  if (remainingMonths === 0) {
    return `${years} year${years !== 1 ? 's' : ''}`;
  }
  
  return `${years} year${years !== 1 ? 's' : ''} ${remainingMonths} month${remainingMonths !== 1 ? 's' : ''}`;
}

/**
 * Validate email address
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Debounce function for performance optimization
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

/**
 * Scroll to element with smooth behavior
 */
export function scrollToElement(elementId: string, offset: number = 0): void {
  const element = document.getElementById(elementId);
  if (element) {
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;
    
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
}