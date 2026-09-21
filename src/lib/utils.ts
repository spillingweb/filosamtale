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

  // 1. Check if we are running in local development
  const isVercelProduction = typeof window !== 'undefined' 
    ? !window.location.hostname.includes('localhost') && !window.location.hostname.includes('127.0.0.1')
    : process.env.NODE_ENV === 'production';

  // Local development bypass
  if (!isVercelProduction) {
    return cleanSrc;
  }

  // 2. Handle absolute paths vs external assets
  if (cleanSrc.startsWith('http')) {
    // Only optimize external images coming from your Tina CMS asset library
    if (cleanSrc.includes('assets.tina.io')) {
      return `/_vercel/image?url=${encodeURIComponent(cleanSrc)}&w=${width}&q=${quality}`;
    }
    // Let other external image links pass through unoptimized
    return cleanSrc; 
  }

  // 3. Handle standard absolute local paths (e.g., /uploads/...)
  if (!cleanSrc.startsWith('/')) {
    cleanSrc = '/' + cleanSrc;
  }
  
  return `/_vercel/image?url=${encodeURIComponent(cleanSrc)}&w=${width}&q=${quality}`;
}
