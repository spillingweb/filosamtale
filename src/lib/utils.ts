import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Format a date string to a human-readable format in Norwegian
export function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("nb-NO", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

// Get the optimized image URL for Vercel's Edge CDN, with local development bypass
export function getOptimizedImageUrl(src: string | undefined | null, width: number, quality = 75): string {
  if (!src) return "";
  
  let cleanSrc = src.trim();

  // Ensure absolute paths formatting
  if (!cleanSrc.startsWith('/') && !cleanSrc.startsWith('http')) {
    cleanSrc = '/' + cleanSrc;
  }
  
  if (cleanSrc.startsWith('http')) return cleanSrc; 

  // ✨ BULLETPROOF PRODUCTION CHECK: Only use Vercel optimization in production
  const isVercelProduction = typeof window !== 'undefined' 
    ? !window.location.hostname.includes('localhost') && !window.location.hostname.includes('127.0.0.1')
    : process.env.NODE_ENV === 'production';

  if (!isVercelProduction) {
    return cleanSrc; // Bypass optimization during local development
  }
  
  // Routes local assets explicitly through Vercel's Optimization Proxy
  return `/_vercel/image?url=${encodeURIComponent(cleanSrc)}&w=${width}&q=${quality}`;
}
