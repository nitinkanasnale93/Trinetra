"use client";

import { useEffect, useRef } from "react";
import { useMap } from "react-leaflet";

type Props = {
  onComplete: () => void;
};

export default function MapIntro({
  onComplete,
}: Props) {
  const map = useMap();
  const played = useRef(false);

  useEffect(() => {
    if (played.current) return;

    played.current = true;

    async function play() {
      map.flyTo([14.2, 77.2], 6, {
        duration: 2,
      });

      await new Promise((r) =>
        setTimeout(r, 2200)
      );

      map.flyTo([15.3, 75.7], 7, {
        duration: 2,
      });

      await new Promise((r) =>
        setTimeout(r, 2200)
      );

      map.flyTo([12.9716, 77.5946], 10, {
        duration: 2,
      });

      await new Promise((r) =>
        setTimeout(r, 2200)
      );

      onComplete();
    }

    play();
  }, [map, onComplete]);

  return null;
}