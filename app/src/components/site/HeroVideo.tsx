"use client";

import { useState } from "react";

/**
 * Homepage hero video. Source and poster come from SiteSettings (editable in
 * /studio/settings) so footage can be swapped without a code change; the
 * treatment around it (scrims, fallback gradient) is video-agnostic. On any
 * playback error it unmounts and the branded gradient layers show instead.
 */
export function HeroVideo({ src, poster }: { src?: string; poster?: string }) {
  const [failed, setFailed] = useState(false);

  if (failed) return null;

  return (
    <video
      muted
      loop
      playsInline
      autoPlay
      preload="metadata"
      poster={poster || undefined}
      src={src || "/hero-video.mp4"}
      onError={() => setFailed(true)}
      className="absolute inset-0 h-full w-full object-cover"
    />
  );
}
