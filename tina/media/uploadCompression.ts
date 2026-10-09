import type { MediaUploadOptions } from "tinacms";

const MAX_IMAGE_DIMENSION = 1920;
const TARGET_IMAGE_MAX_MB = 1.2;
const COMPRESSION_WRAP_FLAG = "__imageCompressionWrapped__";

export function canCompressInBrowser(): boolean {
  return typeof window !== "undefined" && typeof File !== "undefined";
}

function shouldCompressFile(file: File): boolean {
  if (!file.type.startsWith("image/")) return false;
  if (file.type === "image/svg+xml" || file.type === "image/gif") return false;
  return true;
}

async function compressImageForUpload(file: File): Promise<File> {
  const { default: imageCompression } = await import("browser-image-compression");

  const compressed = await imageCompression(file, {
    maxSizeMB: TARGET_IMAGE_MAX_MB,
    maxWidthOrHeight: MAX_IMAGE_DIMENSION,
    useWebWorker: true,
    initialQuality: 0.78,
  });

  if (compressed.size >= file.size) {
    return file;
  }

  // Keep original filename + MIME to avoid extension/type mismatches in media tools.
  return new File([compressed], file.name, {
    type: file.type || compressed.type,
    lastModified: Date.now(),
  });
}

export function attachUploadCompression(cms: any) {
  const tryWrapPersist = (): boolean => {
    const store = cms?.media?.store;
    if (!store || typeof store.persist !== "function") return false;
    if ((store as Record<string, unknown>)[COMPRESSION_WRAP_FLAG]) return true;

    const originalPersist = store.persist.bind(store);
    store.persist = async (media: MediaUploadOptions[]) => {
      if (!canCompressInBrowser()) {
        return originalPersist(media);
      }

      const compressedUploads = await Promise.all(
        media.map(async (item) => {
          const file = item?.file;
          if (!file || !shouldCompressFile(file)) return item;

          try {
            const compressedFile = await compressImageForUpload(file);
            return { ...item, file: compressedFile };
          } catch (error) {
            console.warn("Image compression failed, uploading original file instead.", error);
            return item;
          }
        }),
      );

      return originalPersist(compressedUploads);
    };

    (store as Record<string, unknown>)[COMPRESSION_WRAP_FLAG] = true;
    return true;
  };

  if (tryWrapPersist()) return;

  let attempts = 0;
  const maxAttempts = 20;
  const interval = window.setInterval(() => {
    attempts += 1;
    if (tryWrapPersist() || attempts >= maxAttempts) {
      window.clearInterval(interval);
    }
  }, 200);
}