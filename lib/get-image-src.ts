import { Media } from "@/payload-types";

export function getImageSrc(
  media: Media | number | null | undefined,
  defaultValue: string | null = null
): string | null {
  if (media && typeof media === "object" && media.url) {
    return media.url;
  }
  return defaultValue;
}
