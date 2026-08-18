/**
 * Deduplicated CDN media inventory (Pexels + Unsplash), per DESIGN_SPEC.md §8.
 * Kept as named constants so a real asset pipeline can swap them in one place.
 */

export const HERO_VIDEO_URL =
  "/app/public/hero-video.mp4";
export const HERO_POSTER_URL =
  "https://images.pexels.com/videos/7456696/4k-agricultural-agriculture-batch-7456696.jpeg?auto=compress&cs=tinysrgb&w=1600";

function unsplash(id: string) {
  return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&q=72`;
}

export const PRODUCT_PHOTOS = {
  pineapple: unsplash("photo-1518977676601-b53f82aba655"),
  ugu: unsplash("photo-1523348837708-15d4a09cfac2"),
  pepper: unsplash("photo-1441057206919-63d19fac2369"),
  carrots: unsplash("photo-1571771894821-ce9b6c11b08e"),
  watermelon: unsplash("photo-1587049352846-4a222e784d38"),
  coconut: unsplash("photo-1560493676-04071c5f467b"),
  onions: unsplash("photo-1518843875459-f738682238a6"),
  plantain: unsplash("photo-1603833665858-e61d17a86224"),
} as const;

/** Generic fallback ("FARM") used for anything without a specific photo, and
 * for every blog post except the Export category. */
export const FARM_PHOTO = unsplash("photo-1500937386664-56d1dfef3854");
/** Used for the Export-category blog post/card image. */
export const MARKET_PHOTO = PRODUCT_PHOTOS.ugu;

/** The 9-image pool the Gallery cycles through by index. */
export const GALLERY_PHOTO_POOL = [
  ...Object.values(PRODUCT_PHOTOS),
  FARM_PHOTO,
];

export function galleryPhotoForIndex(index: number) {
  return GALLERY_PHOTO_POOL[index % GALLERY_PHOTO_POOL.length];
}

export const CATEGORY_SWATCH: Record<string, string> = {
  Fruit: "linear-gradient(135deg,#FFE0C7,#F9A870)",
  Veg: "linear-gradient(135deg,#CDEED8,#8FD3A9)",
};
