"use client";

import { useState } from "react";
import { HERO_VIDEO_URL, HERO_POSTER_URL } from "@/lib/images";

export function HeroVideo() {
  const [failed, setFailed] = useState(false);

  if (failed) return null;

  return (
    <video
      muted
      loop
      playsInline
      autoPlay
      preload="auto"
      poster={HERO_POSTER_URL}
      src={HERO_VIDEO_URL}
      onError={() => setFailed(true)}
      className="absolute inset-0 h-full w-full object-cover"
    />
  );
}
