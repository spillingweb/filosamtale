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
  
  // If it's already an external absolute URL (e.g. from an external CMS asset hosting link), let it pass straight through
  if (!src.startsWith('/')) return src; 
  
  // NATIVE LOCAL BYPASS: During local Vite development, Vercel's edge proxy will return a 404.
  // We check the environment status dynamically to ensure your local dev experience stays fast and unbroken.
  if (import.meta.env.DEV) {
    return src;
  }
  
  // Routes local paths through Vercel's Edge CDN Optimization pipeline
  return `/_vercel/image?url=${encodeURIComponent(src)}&w=${width}&q=${quality}`;
}
