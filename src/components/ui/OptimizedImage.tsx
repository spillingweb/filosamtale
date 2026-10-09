import React from "react";

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
  widths?: number[];
  defaultWidth?: number;
}

export function OptimizedImage({
  src,
  fallbackSrc,
  widths: _widths,
  defaultWidth: _defaultWidth,
  ...props
}: OptimizedImageProps) {
  const finalSrc = (src || fallbackSrc || "").trim();

  if (!finalSrc) return null;

  return <img src={finalSrc} {...props} />;
}
