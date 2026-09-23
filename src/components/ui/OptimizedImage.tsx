import React from "react";

// Standard mobile, tablet, and desktop layout width parameters for Vercel
const DEFAULT_WIDTHS = [384, 640, 750, 828, 1080, 1200, 1920, 2048];

/**
 * Core utility to format and route paths through Vercel's Edge Optimization proxy
 */
export function getOptimizedImageUrl(src: string | undefined | null, width: number, quality = 75): string {
  if (!src) return "";
  
  let cleanSrc = src.trim();

  // Safeguard: handle local dev bypass across both server & client context modes
  const isVercelProduction = typeof window !== 'undefined' 
    ? !window.location.hostname.includes('localhost') && !window.location.hostname.includes('127.0.0.1')
    : process.env.NODE_ENV === 'production';

  if (!isVercelProduction) {
    return cleanSrc;
  }

  // Optimize external Tina Cloud asset paths
  if (cleanSrc.startsWith('http')) {
    if (cleanSrc.includes('assets.tina.io')) {
      return `/_vercel/image?url=${encodeURIComponent(cleanSrc)}&w=${width}&q=${quality}`;
    }
    return cleanSrc; 
  }

  // Format local public paths
  if (!cleanSrc.startsWith('/')) {
    cleanSrc = '/' + cleanSrc;
  }
  
  return `/_vercel/image?url=${encodeURIComponent(cleanSrc)}&w=${width}&q=${quality}`;
}

/**
 * TypeScript Props Interface for the unified Component
 */
interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
  widths?: number[];
  defaultWidth?: number;
}

/**
 * Unified Image Component with automated srcSet and Vercel edge integration
 */
export function OptimizedImage({
  src,
  fallbackSrc,
  widths = DEFAULT_WIDTHS,
  defaultWidth = 640,
  sizes = "100vw",
  ...props
}: OptimizedImageProps) {
  const finalSrc = src || fallbackSrc || "";
  
  if (!finalSrc) return null;

  // Build the responsive srcSet map automatically from the width bounds array
  const srcSetString = widths
    .map((w) => `${getOptimizedImageUrl(finalSrc, w)} ${w}w`)
    .join(", ");

  return (
    <img
      src={getOptimizedImageUrl(finalSrc, defaultWidth)}
      srcSet={srcSetString}
      sizes={sizes}
      {...props}
    />
  );
}
